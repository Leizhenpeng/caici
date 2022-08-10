<script setup lang="ts">
import { t } from '~/i18n'
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
function handleInput(e: Event) {
  const el = (e.target! as HTMLInputElement)
  input.value = filterNonChineseChars(el.value).slice(0, 4)
}
function resetInputValue() {
  inputValue.value = ''
  input.value = ''
}
function magicDelete() {
  resetInputValue()
  focus()
}
</script>

<template>
  <div p8 flex="~ col gap-4" items-center>
    <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="close()">
        <div i-carbon-close />
      </button>
    </div>
    <p text-xl font-serif mb2>
      <b>{{ t('play-together') }}</b>
    </p>

    <div>
      <WordBlocks :word="input" :active="false" :force-four="true" @click="focus()" />
      <div relative border="2 base rounded-0 ">
        <input
          ref="el" v-model="inputValue" bg-transparent w-86 p3 outline-none text-center type="text"
          autocomplete="false" :placeholder="t('multiplayer-placeholder')" :class="{ shake }"
          @input="handleInput" @keydown.enter="enter"
        >
        <div
          absolute top-0 left-0 right-0 bottom-0 flex="~ center" bg-base transition-all duration-300 text-mis
          pointer-events-none :class="showToast ? '' : 'op0 translate-y--1'"
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

    <button mt3 btn p="x6 y2" :disabled="input.length !== 4" @click="enter">
      {{ t('ok-spaced') }}
    </button>
  </div>
</template>

<style scoped>
</style>
