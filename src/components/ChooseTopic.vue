<script setup lang="ts">
import { colorblind, inputMode, meta, spMode, useCheckAssist, useNoHint, useNumberTone as useNumberToneRaw, useStrictMode } from '~/storage'
import { useNumberTone } from '~/state'
import { locale, t } from '~/i18n'

defineProps<{
  lite?: boolean
}>()
</script>

<template>
  <div flex="~ col">
    <div pb2 op50>
      {{ t('choose-topic') }}
    </div>
    <div flex="~ center wrap">
      <div square-btn m2>
        <button :class="locale === 'hans' ? 'text-primary' : 'op80' " @click="locale = 'hans'">
          {{ t('play-title-chengyu') }}
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="locale === 'hant' ? 'text-primary' : 'op80' " @click="locale = 'hant'">
          {{ t('play-title-wuyan') }}
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="locale === 'hant' ? 'text-primary' : 'op80' " @click="locale = 'hant'">
          {{ t('play-title-qiyan') }}
        </button>
      </div>
    </div>
  </div>
</template>
