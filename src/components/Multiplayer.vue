<script setup lang="ts">
import { useMotions } from '@vueuse/motion'
import { nanoid } from 'nanoid'
import { t } from '~/i18n'
import type { EPlayer } from '~/logic'
import { filterNonChineseChars } from '~/logic'
import { showMultiplayer } from '~/state'
const input = ref('')
const inputValue = ref('')
const el = ref<HTMLInputElement>()
const showToast = autoResetRef(false, 1000)
const shake = autoResetRef(false, 500)

function close() {
  showMultiplayer.value = false
}
function focus() {
  el.value?.focus()
}

function enter() {
  if (input.value.length !== 4)
    return
  input.value = ''
  inputValue.value = ''
}

function resetInputValue() {
  inputValue.value = ''
  input.value = ''
}
function magicDelete() {
  resetInputValue()
  focus()
}

const motions = useMotions()
const showCodeTip = ref(false)
const showPlayer = ref(true)

const showRoomTip = computed(() => {
  return !showCodeTip.value
})

function startSearch(status?: boolean) {
  if (status === undefined) {
    showCodeTip.value = !showCodeTip.value
    showPlayer.value = !showPlayer.value
  }
  if (typeof status === 'boolean') {
    showCodeTip.value = !status
    showPlayer.value = status
  }
}
const playersInRoom = ref<EPlayer[]>([
  {
    name: '李小白',
    type: 'player',
    id: nanoid(),
  },
])

const PlayersLastInsertOne = computed<EPlayer[]>(() => {
  // deepclone array
  const _players = playersInRoom.value.slice()
  _players.push({
    name: 'faker',
    type: 'faker',
    id: nanoid(),
  })
  return _players
})
watch(() => {
  return PlayersLastInsertOne.value
}, (players) => {
  console.log('players', players)
})
const addPlayer = (player: EPlayer) => {
  playersInRoom.value.push(player)
}
function handleInput(e: Event) {
  const el = (e.target! as HTMLInputElement)
  input.value = filterNonChineseChars(el.value).slice(0, 4)

  if (input.value.length >= 4) {
    inputValue.value = input.value
    showPlayer.value = true
    startSearch(true)
  }
  else {
    startSearch(false)
  }
}
</script>

<template>
  <div flex="~ col gap-4" items-center min-h-90vh relative>
    <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="close()">
        <div i-carbon-close />
      </button>
    </div>
    <p pt8 text-xl font-serif mb2>
      <b>{{ t('play-together') }}-🏗WIP</b>
    </p>
    <transition :css="false">
      <div
        v-if="showCodeTip" v-motion="'multiTip'" mt-1 op50 text-md w-full :initial="{
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
      <WordBlocks
        :word="input" :active="false" :force-four="true" :revealed="false"
        @click="focus()"
      />
      <div relative border="2 base rounded-0 ">
        <input
          ref="el" v-model="inputValue" bg-transparent w-86 p3 outline-none text-center
          type="text" autocomplete="false" :placeholder="t('multiplayer-placeholder')"
          :class="{ shake }" @input="handleInput" @keydown.enter="enter"
        >
        <div
          absolute top-0 left-0 right-0 bottom-0 flex="~ center" bg-base transition-all
          duration-300 text-mis pointer-events-none :class="showToast ? '' : 'op0 translate-y--1'"
        >
          <span tracking-1 pl1>
            {{ t('invalid-idiom') }}
          </span>
        </div>
        <div
          absolute top-0 right-0 bottom-0 mya px3 flex="~ center" icon-btn op-60
          @click="magicDelete"
        >
          <div i-carbon-magic-wand-filled />
        </div>
      </div>
    </div>
    <div h-1px w-10 border="b base" />

    <transition :css="false" @leave="(el: Element, done: any) => motions.multiPlayer.leave(done)">
      <div>
        <div v-if="showRoomTip" mb-2 op50 text-md w-full>
          <p text-center>
            {{ t('multiplayer-room-tip') }}
          </p>
        </div>
        <div
          v-if="showPlayer" v-motion="'multiPlayer'" card-meta max-h-400px min-h-200px max-w-370px
          flex="justify-start ~ wrap gap-4 " items-start content-start relative px8 py4 :initial="{
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
            <Avatar :if-wait="item.type === 'faker'" :name="item.name" />
          </div>
        </div>
      </div>
    </transition>

    <div card-meta fixed mxa bottom-30px>
      <SettingMeta
        :key-name="t('change-name')" :key-description="t('change-name-des')"
        :if-show-mask="false"
      >
        <template #changePart>
          <div
            class="item-hover" min-w-130px flex="~ between" bg-dark bg-op-2 dark:bg-white
            dark:bg-op-2 rounded px2 py1
          >
            <input type="text" bg-transparent max-w-90px outline-none>
            <div i-carbon-rotate icon-btn @click="startSearch()" />
            <div
              i-carbon-add icon-btn @click="addPlayer({
                name: '杜大甫',
                type: 'player',
              })"
            />
          </div>
        </template>
      </SettingMeta>
    </div>
    <!-- <button mt3 btn p="x6 y2" :disabled="input.length !== 4" @click="enter">
      {{ t('ok-spaced') }}
    </button> -->
  </div>
</template>

<style scoped>
</style>
