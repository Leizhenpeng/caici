<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { roomAccess, roomInfo } from '~/api'
import { CheckRoomInitWhenGameOn } from '~/socket-io'
import { UserTry, answerTogther, mySocket } from '~/state'
import { TogetherGameMode, deviceId, nickName } from '~/storage'

const router = useRouter()
const route = useRoute()
const roomId = route.query?.id as string
const ifPass = route.params?.pass as string

const loadReady = ref(false)
const wordLength = ref(0)
const playMode = ref(TogetherGameMode.COMPETITION)
const topicId = ref(2)
const answer = ref('')
const baseUserInfo = ref()
const initHintLevel = ref(0)
const redictWaitRoom = () => {
  router.replace({
    name: 'together-wait',
    params: {
      notCheck: 1,
    },
  })
}
// master? player? watcher?
async function checkRoomIfAccessible(roomId: string, uuid: string) {
  if (!roomId) {
    redictWaitRoom()
    return false
  }

  if (ifPass)
    return true

  const { ifAccessible } = await roomAccess(roomId, deviceId.value, mySocket.value?.id as string)
  if (!ifAccessible)
    redictWaitRoom()
}

async function getRoomInfo(roomId: string, uuid: string) {
  roomInfo(roomId, uuid, mySocket.value?.id as string).then(
    (out) => {
      console.log('out', out)
      baseUserInfo.value = out.playerInfos
      answer.value = out.answer!
      answerTogther.value = { word: out.answer!, hint: out.hintWord! }
      topicId.value = out.topicId!
      playMode.value = out.playMode as TogetherGameMode
      loadReady.value = true
      console.log('answerTogther', answerTogther)
    },
  ).catch(
    (err) => {
      console.error(err)
      redictWaitRoom()
    },
  )
}

onMounted(async () => {
  await checkRoomIfAccessible(roomId, deviceId.value)
  await getRoomInfo(roomId, deviceId.value)
})

function formatUserTryFromServer(tryInfo: string) {
  const [genId, nickName, tryWord, tryTime, ifPass] = tryInfo.split(',')
  return new UserTry(~~genId, nickName, tryWord, tryTime, ~~ifPass)
}
const playerTrysInit = ref<UserTry[]>([])
mySocket.value?.on(CheckRoomInitWhenGameOn, ({ userTrys, nickName: nickFromServer, hintLevel }) => {
  playerTrysInit.value = userTrys.map(formatUserTryFromServer)
  console.log('playerTrysInit', playerTrysInit)
  nickName.value = nickFromServer
  // hintLevelInRoom.value = ~~hintLevel
  initHintLevel.value = ~~hintLevel
})
</script>

<template>
  <div>
    <div v-if="loadReady" p="4">
      <PlayTogether
        :key="wordLength"
        :init-hint-level="initHintLevel" :base-user-info="baseUserInfo" :answer-in-room="answer" :word-length="wordLength" :game-mode="playMode"
        :topic-id="topicId" :play-init-trys="playerTrysInit"
      />
    </div>
    <div v-else>
      <loading-one mx-a my-30vh />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
