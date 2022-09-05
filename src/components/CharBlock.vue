<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { MatchResult, MatchType, ParsedChar } from '~/logic/types'
import { inputMode, useCheckAssist } from '~/storage'
import { getSymbolStateSolo, ifMinFont5 as ifMinFont5_, ifMinFont7 as ifMinFont7_, useMask, useNumberTone } from '~/state'

const props = withDefaults(defineProps<{
  char?: ParsedChar
  answer?: MatchResult
  active?: boolean
  forceFour?: boolean // 强制 4字, 用在多人成语口令中
}>(), {
  forceFour: false,
})

const exact = computed(() => props.answer && Object.values(props.answer).every(i => i === 'exact'))

const parsed = computed(() => {
  if (props.answer)
    return props.answer
  if (!props.char || !useCheckAssist.value || !props.active)
    return

  // Assist coloring
  return {
    _1: getSymbolStateSolo(props.char._1, inputMode.value === 'sp' ? '_1' : undefined) === 'none' ? 'deleted' : undefined,
    _2: getSymbolStateSolo(props.char._2, inputMode.value === 'sp' ? '_2' : undefined) === 'none' ? 'deleted' : undefined,
    _3: getSymbolStateSolo(props.char._3) === 'none' ? 'deleted' : undefined,
    tone: getSymbolStateSolo(props.char.tone, 'tone') === 'none' ? 'deleted' : undefined,
  } as MatchResult
})

function getColor(result?: MatchType, isChar = false) {
  const pre = useMask.value
    ? `bg-current ${isChar ? ' !op70' : '!op40'} border border-current`
    : ''

  if (!result || exact.value)
    return pre

  const colors = {
    exact: 'text-ok',
    misplaced: 'text-mis',
    none: isChar ? 'op80' : 'op35',
    deleted: inputMode.value === 'zy' ? 'op30' : 'line-through op30',
  }
  return `${pre} ${colors[result]}`
}

const blockColor = computed(() => {
  if (!props.answer)
    return 'border-base'
  if (exact.value)
    return 'border-transparent bg-ok text-white'
  return 'border-transparent bg-gray-400/8'
})

const toneCharLocation = computed(() => {
  const part = props.char?._2 || ''
  return [
    part.lastIndexOf('iu') > -1 ? part.lastIndexOf('iu') + 1 : -1,
    part.lastIndexOf('a'),
    part.lastIndexOf('e'),
    part.lastIndexOf('o'),
    part.lastIndexOf('i'),
    part.lastIndexOf('u'),
    part.lastIndexOf('v'),
  ].find(i => i !== null && i >= 0) || 0
})

const vLocation = computed(() => {
  const part = props.char?._2 || ''
  return part.lastIndexOf('v')
})

const partTwo = computed(() => {
  const two = (props.char?._2 || '')
  const index = toneCharLocation.value
  // replace i with dot less for tone symbol
  if (!useNumberTone.value && two[index] === 'i')
    return `${two.slice(0, index)}ı${two.slice(index + 1)}`
  return two
})

const ifMinFont5 = computed(() => {
  if (!props.forceFour)
    return ifMinFont5_.value
  return false
})
const ifMinFont7 = computed(() => {
  if (!props.forceFour)
    return ifMinFont7_.value
  return false
})
</script>

<template>
  <div
    h-20 w-20 border-2 flex="~ center" relative leading-1em font-serif :class="[
      blockColor,
      ifMinFont5 ? '!w-16 !h-18 ' : '',
      ifMinFont7 ? '!w-12 !h-13 ' : '',
    ]"
  >
    <template v-if="char?.char?.trim()">
      <!-- Zhuyin -->
      <template v-if="inputMode === 'zy'">
        <div
          absolute text-3xl leading-1em flex items-center text-center top-0 bottom-0 :class="[
            getColor(parsed?.char, true),
            useMask ? 'left-3' : 'left-4',
          ]"
        >
          {{ char.char }}
        </div>
        <div v-if="!forceFour" absolute flex items-center text-center top-0 bottom-0 right="2.5" w="5">
          <div flex="~ center" text-xs style="writing-mode: vertical-rl">
            <span v-if="char._1" :class="getColor(parsed?._1)">
              {{ char._1 }}
            </span>
            <span v-if="char._2" :class="getColor(parsed?._2)">
              {{ char._2 }}
            </span>
            <span v-if="char._3" :class="getColor(parsed?._3)">
              {{ char._3 }}
            </span>
          </div>
          <ToneSymbol :tone="char.tone" :class="getColor(parsed?.tone)" mt--1 min-w-6px />
        </div>
      </template>

      <!-- Pinyin or Shuangpin -->
      <template v-else>
        <div
          absolute text-3xl leading-1em :class="[
            getColor(parsed?.char, true),
            forceFour ? 'text-4xl !top-5 op-80 font-400' : '',
            useMask ? 'top-8.5' : 'top-7',
            ifMinFont5 ? useMask ? 'top-8.5' : '!text-3xl !top-6 !leading-30px' : '',
            ifMinFont7 ? useMask ? '!text-xl !top-26px  !leading-20px' : '!text-xl !top-20px !leading-20px' : '',
          ]"
        >
          {{ char.char }}
        </div>
        <div
          v-if="!forceFour" absolute font-mono text-center left-0 right-0 font-100 flex flex-col items-center justify-center :class="[
            useMask ? 'top-14px' : 'top-2',
            ifMinFont5 ? '!text-14px !leading-16px' : '',
            ifMinFont7 ? useMask ? '!top-11px !leading-11px !text-8px' : '!text-12px !top-4px  !leading-18px' : '',
          ]"
        >
          <div
            relative ma items-start flex="~ x-center" :class="[
              ifMinFont7 ? useMask ? 'tone-scale' : '' : '',
            ]"
          >
            <div v-if="char._1" font-600 :class="[getColor(parsed?._1), ifMinFont7 ? 'ml--2px mr-1px' : 'mx1px']">
              {{ char._1 }}
            </div>
            <div v-if="partTwo" flex>
              <div v-for="w, idx of partTwo" :key="idx" relative>
                <div :class="getColor(parsed?._2)" font-600>
                  {{ inputMode === 'sp' ? w : w.replace('v', 'u') }}
                </div>
                <VDots
                  v-if="!useMask && idx === vLocation && inputMode === 'py'" :class="getColor(parsed?._2)" absolute w="87%" left="8%"
                  bottom="0.76rem"
                />
                <ToneSymbol
                  v-if="!useNumberTone && idx === toneCharLocation" :tone="char.tone" :class="getColor(parsed?.tone)" absolute
                  w="86%" left="8%" :style="{
                    bottom: useMask
                      ? ifMinFont7 ? '14px' : '1.25rem'
                      : w === 'v'
                        ? '0.85rem'
                        : '0.78rem',
                  }"
                />
              </div>
            </div>
            <div v-if="useNumberTone" :class="getColor(parsed?.tone)" text-xs leading-1em mr--3 mt--1 ml-1px>
              {{ char.tone }}
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
