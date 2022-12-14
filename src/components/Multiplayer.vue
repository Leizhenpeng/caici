<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useInterval, watchDebounced } from '@vueuse/core'
import { useMotions } from '@vueuse/motion'
import uniqBy from 'lodash/uniqBy'
import { useRouter } from 'vue-router'
import type { MetaRoomEntity } from '~/api'
import { findAndJoinRoom, genRandomNickname } from '~/api'
import { t } from '~/i18n'
import type { EPlayer } from '~/logic'
import { filterNonChineseChars } from '~/logic'
import { BroadcashStartGame, BroadcastChangeMaster, BroadcastChangeName, ByeOldPlayer, CheckRoomInit, CheckRoomUpdate, NicknameChange, RoomGameModeChange, RoomGameStart, RoomGameTopicChange, RoomLeaveOut, WelcomeNewPlayer } from '~/socket-io'
import { SocketRole, ifJoinWaitRoom, isDevPro, mySocket, showTogetherShare, togetherWords } from '~/state'
import { TogetherGameMode, deviceId, nickName, togetherRecentGameMode, togetherRecentTopic } from '~/storage'

const props = withDefaults(defineProps<{
  prePutWord?: string
}>(), {
  prePutWord: '',
})
const { prePutWord: rawInputWord } = props
const prePutWord = filterNonChineseChars(rawInputWord)
const input = ref(prePutWord)
const inputValue = ref(prePutWord)
const el = ref<HTMLInputElement>()
const showToast = autoResetRef(false, 1000)
const shake = autoResetRef(false, 500)
const roomInfo = ref<MetaRoomEntity>()
const totalTimeWaited = ref(5)
const { counter: timeCounter, pause: pauseCount, resume: resumeCount } = useInterval(800, { controls: true, immediate: false })
const startGameSoon = ref(false)
const leftTimeStart = computed(
  () => totalTimeWaited.value - timeCounter.value,
)

const router = useRouter()
const redictGameRoom = (targetRoomId: string) => {
  router.replace({
    name: 'room',
    query: {
      id: targetRoomId,
    },
    params: {
      pass: 1,
    },
  })
}
watch(leftTimeStart, (v) => {
  if (v <= 1) {
    pauseCount()
    startGameSoon.value = false
    timeCounter.value = 0
    if (roomInfo.value?.uniDoor)
      redictGameRoom(roomInfo.value.uniDoor)
  }
})

function focus() {
  el.value?.focus()
}

function resetInputValue() {
  inputValue.value = ''
  input.value = ''
}
function magicDelete() {
  resetInputValue()
  focus()
}

function handleInput(e: Event) {
  const el = (e.target! as HTMLInputElement)
  input.value = filterNonChineseChars(el.value).slice(0, 4)
}
const motions = useMotions()

const playerRole = ref<EPlayer['type']>(SocketRole.Master)

const nickNameUsed = computed(() => {
  const chineseNickName = filterNonChineseChars(nickName.value).slice(0, 3)
  return chineseNickName.length > 0 ? chineseNickName : '?????????'
})
const initPlayerList = ref<EPlayer[]>([])
const { state: gameModeNow, next: nextGameMode } = useCycleList([TogetherGameMode.COMPETITION, TogetherGameMode.COOPERATION], {
  initialValue: togetherRecentGameMode.value,
})

const { state: topicNow, next: nextGameTopic } = useCycleList([1, 2, 3], {
  initialValue: togetherRecentTopic.value,
})
watchDebounced(gameModeNow, () => {
  mySocket.value?.emit(RoomGameModeChange, gameModeNow.value)
}, { debounce: 1000, maxWait: 1200 })

watchDebounced(topicNow, () => {
  mySocket.value?.emit(RoomGameTopicChange, topicNow.value)
}, { debounce: 1000, maxWait: 1200 })

const generalGameMode = computed(() => {
  if (playerRole.value === SocketRole.Master)
    return gameModeNow.value
  else
    return togetherRecentGameMode.value
})

const generalTopic = computed(() => {
  if (playerRole.value === SocketRole.Master)
    return topicNow.value
  else
    return togetherRecentTopic.value
})
watchDebounced(
  input, // ????????????????????????
  () => {
    console.log('input', input)
    if (input.value.length >= 4) {
      togetherWords.value = input.value
      findAndJoinRoom({
        uuid: deviceId.value,
        words: input.value,
        socketId: mySocket.value?.id,
        topicId: togetherRecentTopic.value,
        nickName: nickNameUsed.value,
        gameMode: togetherRecentGameMode.value,
      }).then((res) => {
        console.log('res', res)
        playerRole.value = res.role
      },
      )
    }
    else {
      // startSearch(false)
      initPlayerList.value = []
      mySocket.value?.emit(RoomLeaveOut)
    }
  },
  { debounce: 600, maxWait: 1000, immediate: true },
)
// const showRoomTip = computed(() => {
//   return !showCodeTip.value
// })

// function startSearch(status?: boolean) {
//   if (status === undefined) {
//     showCodeTip.value = !showCodeTip.value
//     showPlayer.value = !showPlayer.value
//   }
//   if (typeof status === 'boolean') {
//     showCodeTip.value = !status
//     showPlayer.value = status
//   }
// }

watchDebounced(
  nickNameUsed,
  () => {
    mySocket.value?.emit(NicknameChange, nickNameUsed.value)
  },
  { debounce: 600, maxWait: 1000, immediate: true },
)
const playersInRoom = computed<EPlayer[]>(() => {
  return uniqBy([
    // {
    //   name: '?????????',
    //   id: 'player',
    //   type: SocketRole.Master,
    // },
    // {
    //   name: nickNameUsed.value,
    //   id: 'player',
    //   type: SocketRole.Player,
    // },
    ...initPlayerList.value,
  ], 'id')
})
watchDebounced(playersInRoom,
  () => {
    const totalWaitedNum = playersInRoom.value.length
    ifJoinWaitRoom.value = totalWaitedNum >= 1
  }, { debounce: 400, maxWait: 1000, immediate: true },
)
const PlayersLastInsertOne = computed<EPlayer[]>(() => {
  // deepclone array
  const _players = playersInRoom.value.slice()
  _players.push({
    name: 'faker',
    type: SocketRole.faker,
    id: 'fakerAddOne',
  })
  return _players
})
// watch(() => {
//   return PlayersLastInsertOne.value
// }, (players) => {
//   console.log('players', players)
// })

// const addPlayer = (player: EPlayer) => {
//   playersInRoom.value.push(player)
// }

const canStartGame = computed(() => {
  return playersInRoom.value.length >= 2
})
async function reGenerateNickname() {
  // nickName.value = '??????'
  nickName.value = await genRandomNickname()
}
if (isDevPro) {
  // console.log('???? Hello, developer!')
  // const socket = inject('socket') as SocketIOClient.Socket
  // socket.connect()
  // socket.on('connect', () => {
  //   console.log('#connected: ', socket.id)
  // })
}
function refreshNickName() {
  nickName.value = initPlayerList.value.find(player => player.id === mySocket.value?.id)?.name || nickName.value
}
mySocket.value?.on(CheckRoomInit, (playerList) => {
  console.log('playerList', playerList)
  initPlayerList.value = playerList
  refreshNickName()
})

mySocket.value?.on(WelcomeNewPlayer, (newPlayerInfo) => {
  console.log('newPlayerInfo', newPlayerInfo)
  initPlayerList.value.push(newPlayerInfo)
})

mySocket.value?.on(ByeOldPlayer, (leavePlayerInfo) => {
  console.log('leavePlayerInfo', leavePlayerInfo)
  initPlayerList.value = initPlayerList.value.filter(player => player.id !== leavePlayerInfo.id)
})

mySocket.value?.on(BroadcastChangeName, (changeMeta) => {
  console.log('changeMeta', changeMeta)
  initPlayerList.value = initPlayerList.value.map((player) => {
    if (player.id === changeMeta.id)
      player.name = changeMeta.name
    return player
  })
})

mySocket.value?.on(BroadcastChangeMaster, (changeMeta) => {
  console.log('changeMaster', changeMeta)
  // if is me
  if (changeMeta.id === mySocket.value?.id)
    playerRole.value = changeMeta.type
  initPlayerList.value = initPlayerList.value.map((player) => {
    if (player.id === changeMeta.id)
      player.type = changeMeta.type
    return player
  })
})

mySocket.value?.on(CheckRoomUpdate, (latestRoomInfo) => {
  roomInfo.value = latestRoomInfo
  console.log('latestRoomInfo', latestRoomInfo)
  togetherRecentGameMode.value = roomInfo.value?.mode
  // ?????????????????????????????????, ?????????????????? ?????? bug
  // gameModeNow.value = togetherRecentGameMode.value
  togetherRecentTopic.value = parseInt(`${roomInfo.value?.topicId}`)
},
)

mySocket.value?.on(BroadcashStartGame, () => {
  // refresh nikcName
  console.log('BroadcashStartGame')
  refreshNickName()
  startGameSoon.value = true
  resumeCount()
})

const ifInWaitMode = computed(() => {
  return playersInRoom.value.length > 0
})

const ifCanChangeSetting = computed(() => {
  return playerRole.value === SocketRole.Master
})
const openShare = () => {
  showTogetherShare.value = true
}

const startGame = () => {
  if (canStartGame.value)
    mySocket.value?.emit(RoomGameStart)
}
const ifInWatchMode = computed(() => {
  return playerRole.value === SocketRole.watcher
})
</script>

<template>
  <div flex="~ col gap-4" items-center min-h-90vh relative>
    <!-- <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="close()">
        <div i-carbon-close />
      </button>
    </div> -->
    <p pt8 text-xl font-serif mb2 text-center>
      <b>{{ t('play-together') }}</b><br>
      <b text-sm text-center>??????????????????????????????????????</b>
    </p>

    <transition :css="false">
      <div
        v-if="!ifInWaitMode" v-motion="'multiTip'" mt-1 op50 text-md w-full :initial="{
          scale: 0,
          y: -40,
          opacity: 0,
        }" :enter="{
          y: 0,
          opacity: 1,
          scale: 1,
        }"
      >
        <p text-center>
          {{ t('multiplayer-des1') }}
        </p>
        <p text-center>
          {{ t('multiplayer-des2') }}
        </p>
        <p />
      </div>
    </transition>
    <div>
      <WordBlocks :word="input" :active="false" :force-four="true" :revealed="false" @click="focus()" />
      <div relative border="2 base rounded-0 ">
        <input
          ref="el" v-model="inputValue" bg-transparent w-86 p3 outline-none text-center type="text" autocomplete="false"
          :placeholder="t('multiplayer-placeholder')" :class="{ shake }" @input="handleInput"
        >
        <div
          absolute top-0 left-0 right-0 bottom-0 flex="~ center" bg-base transition-all duration-300 text-mis pointer-events-none
          :class="showToast ? '' : 'op0 translate-y--1'"
        >
          <span tracking-1 pl1>
            {{ t('invalid-idiom') }}
          </span>
        </div>
        <div absolute top-0 right-0 bottom-0 mya px3 flex="~ center" icon-btn op-60 @click="magicDelete">
          <div i-carbon-magic-wand-filled />
        </div>
      </div>
    </div>
    <div v-if="ifInWaitMode" h-1px w-10 border="b base" />

    <transition :css="false" @leave="(el: Element, done: any) => motions.multiPlayer.leave(done)">
      <div>
        <div v-if="ifInWaitMode" mb-2 op50 text-md w-full>
          <p v-if="!ifInWatchMode" text-center>
            {{ t('multiplayer-room-tip') }}
          </p>
          <p v-else text-center>
            ????????????????????????,???????????????
          </p>
        </div>
        <div
          v-if="ifInWaitMode" v-motion="'multiPlayer'" card-meta max-h-400px min-h-200px max-w-370px flex="justify-start ~ wrap gap-4 "
          items-start content-start relative px6 py4 :initial="{
            scale: 0,
            y: -40,
            opacity: 0,
          }" :enter="{
            y: 0,
            opacity: 1,
            scale: 1,
          }" :leave="{
            y: -40,
            opacity: 0,
            scale: 0,
          }"
        >
          <!-- <div absolute top-30px left-0 right-0 flex="~ center">
            <MultiLoading />
          </div> -->
          <div v-for="item in PlayersLastInsertOne" :key="item.id" w12 h12>
            <Avatar :if-wait="item.type === SocketRole.faker" :name="item.name" :type="item.type" />
          </div>
          <div class="room-info" absolute left-6 bottom-4 flex="~ row gap-4">
            <button
              min-w-12 rounded-md bg-dark bg-op-2 dark:bg-white dark:bg-op-2 px-2 min-h-6 flex="~ row center" font-serif text-12px
              leading-4 item-hover :disabled="!ifCanChangeSetting" @click="nextGameTopic()"
            >
              <div v-if="generalTopic === 1" flex="~ row center">
                <div i-ph-number-square-four-bold mx1 />????????????
              </div>
              <div v-else-if="generalTopic === 2" flex="~ row center">
                <div i-ph-number-square-five-bold mx1 />????????????
              </div>
              <div v-else-if="generalTopic === 3" flex="~ row center">
                <div i-ph-number-square-seven-bold mx1 />????????????
              </div>
            </button>

            <button
              min-w-12 rounded-md bg-dark bg-op-2 dark:bg-white dark:bg-op-2 px-2 min-h-6 flex="~ row center" font-serif text-12px
              leading-4 item-hover :disabled="!ifCanChangeSetting" @click="nextGameMode()"
            >
              <div v-if="generalGameMode === TogetherGameMode.COMPETITION" flex="~ row center">
                <div i-carbon-two-person-lift mx1 />????????????
              </div>
              <div v-else-if="generalGameMode === TogetherGameMode.COOPERATION" flex="~ row center">
                <div i-carbon-partnership mx1 />????????????
              </div>
            </button>
          </div>
          <div class="room-share" absolute right-6 bottom-4>
            <button
              min-w-12 rounded-md bg-dark bg-op-2 dark:bg-white dark:bg-op-2 px-2 min-h-6 flex="~ row center" font-serif text-12px
              leading-4 item-hover @click="openShare()"
            >
              <div flex="~ row center">
                <div i-carbon-share mr1 />??????
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <div v-if="ifInWaitMode" card-meta mxa bottom-30px>
      <SettingMeta :key-name="t('change-name')" :key-description="t('change-name-des')" :if-show-mask="false">
        <template #changePart>
          <div class="item-hover" min-w-130px flex="~ between" bg-dark bg-op-2 dark:bg-white dark:bg-op-2 rounded px2 py1>
            <input v-model="nickName" maxlength="3" type="text" bg-transparent max-w-90px outline-none>
            <div i-carbon-observed-hail icon-btn @click="reGenerateNickname" />
            <!-- <div
              i-carbon-add icon-btn @click="addPlayer({
                name: '???????????????????????????',
                type: 'player',
              })"
            /> -->
          </div>
        </template>
      </SettingMeta>
    </div>
    <div v-show="ifInWaitMode">
      <div v-if="startGameSoon">
        <button btn p="x4 y2" m1 disabled flex="~ center row">
          <div i-ic-round-timelapse />
          <span tracking-wide pl1>{{ `${leftTimeStart}??????????????????` }}</span>
        </button>
      </div>
      <div v-else-if="playerRole === SocketRole.Master">
        <button v-if="canStartGame" btn p="x4 y2" m1 flex="~ center row" @click="startGame">
          <div i-mdi-human-dolly />
          <span tracking-wide pl1>{{ t('start') }}</span>
        </button>

        <button v-else btn disabled p="x4 y2" m1 flex="~ center row">
          <div i-mdi-human-greeting />
          <span pl1>??????????????????</span>
        </button>
      </div>

      <div v-else-if="playerRole === SocketRole.Player">
        <button btn disabled p="x4 y2" m1 flex="~ center row">
          <div i-mdi-human-female-dance />
          <span pl1>??????????????????</span>
        </button>
      </div>

      <div v-else-if="playerRole === SocketRole.watcher">
        <button btn p="x4 y2" m1 flex="~ center row">
          <div i-mdi-google-cardboard />
          <span tracking-wide pl2>????????????</span>
        </button>
      </div>
    </div>

    <div h-1px w-10 op-100 min-h-100px />
  </div>
</template>

<style scoped>

</style>
