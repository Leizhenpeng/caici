<script setup lang="ts">
import { locale, t } from '~/i18n'
import { showSettings, useNumberTone } from '~/state'
import {
  colorblind,
  currentMeta,
  inputMode,
  spMode,
  topicNow,
  useCheckAssist,
  useNoHint,
  useNumberTone as useNumberToneRaw,
  useStrictMode,
} from '~/storage'

defineProps<{
  lite?: boolean
}>()

function close() {
  showSettings.value = false
}
</script>

<template>
  <div flex="~ col">
    <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="close()">
        <div i-carbon-close />
      </button>
    </div>
    <p text-xl font-serif mb4 mxa>
      <b>{{ t('setting-title') }} </b>
    </p>
    <div flex="~  wrap col gap-1" px-2 py-2 mt-4 min-w-340px mxa bg-dark bg-op-2 dark:bg-white dark:bg-op-2 rounded>
      <p text-md font-serif pl-2>
        <b> 功能 </b>
      </p>
      <SettingMeta key-name="注音" key-description="汉字的拼读方案" key-value="拼音" />
      <SettingMeta key-name="拼法" key-description="双拼的方案选择" key-value="自然码" />
      <SettingMeta key-name="声形" key-description="拼音声调的样式" key-value="符号" />
      <SettingMeta key-name="约束" key-description="限制输入内容必须为相应的成语或古诗词">
        <template #key>
          <button>
            222
          </button>
        </template>
      </SettingMeta>
    </div>
    <div flex="~  wrap col gap-1" px-2 py-2 mt-4 min-w-340px mxa bg-dark bg-op-2 dark:bg-white dark:bg-op-2 rounded>
      <p text-md font-serif pl-2>
        <b> 外观 </b>
      </p>
      <SettingMeta key-name="用言" key-description="这会影响到部分文案和提醒相关的功能" key-value="简体" />
      <SettingMeta key-name="用色" key-description="主题色" key-value="暗黑" />
      <SettingMeta key-name="辅言" key-description="获取字音, 偏旁, 字形等方面的提醒" key-value="符号" />
      <SettingMeta key-name="辅助" key-description="当前尝试信息是否重复" key-value="符号" />
      <SettingMeta key-name="辅示" key-description="限制输入内容必须为相应的成语或古诗词">
        <template #key>
          <button>
            222
          </button>
        </template>
      </SettingMeta>
    </div>

    <div flex="~ center wrap">
      <div square-btn m2>
        <button :class="locale === 'hans' ? 'text-primary' : 'op80'" @click="locale = 'hans'">
          简体
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="locale === 'hant' ? 'text-primary' : 'op80'" @click="locale = 'hant'">
          繁體
        </button>
      </div>
      <button square-btn m2 :class="colorblind ? 'text-primary' : 'op80'" @click="colorblind = !colorblind">
        {{ t('colorblind-mode') }}
        <div v-if="colorblind" square-btn-mark />
      </button>
    </div>
    <div flex="~ center wrap">
      <div square-btn m2>
        <button :class="inputMode === 'py' ? 'text-primary' : 'op80'" @click="inputMode = 'py'">
          {{ t('pinyin') }}
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="inputMode === 'zy' ? 'text-primary' : 'op80'" @click="inputMode = 'zy'">
          {{ t('zhuyin') }}
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="inputMode === 'sp' ? 'text-primary' : 'op80'" @click="inputMode = 'sp'">
          {{ t('shuangpin') }}
        </button>
      </div>
      <div square-btn m2 :class="inputMode !== 'py' ? 'op50 pointer-events-none' : ''">
        <button :class="!useNumberTone ? 'text-primary' : 'op80'" @click="useNumberToneRaw = false">
          {{ t('tone-symbol') }}
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="useNumberTone ? 'text-primary' : 'op80'" @click="useNumberToneRaw = true">
          {{ t('tone-number') }}
        </button>
      </div>
    </div>
    <div v-if="inputMode === 'sp'" flex="~ center wrap">
      <div square-btn m2>
        <button :class="spMode === 'sougou' ? 'text-primary' : 'op80'" @click="spMode = 'sougou'">
          {{ t('shuangpin-sougou') }}
        </button>
        <div w-1px h-4 border="r base" />
        <button :class="spMode === 'xiaohe' ? 'text-primary' : 'op80'" @click="spMode = 'xiaohe'">
          {{ t('shuangpin-xiaohe') }}
        </button>
      </div>
    </div>
    <div v-if="!lite" flex="~ center wrap">
      <button square-btn m2 :class="useNoHint ? 'text-primary' : 'op80'" @click="useNoHint = !useNoHint">
        {{ t('hard-mode') }}
        <div v-if="useNoHint" square-btn-mark />
      </button>
      <button square-btn m2 :class="useCheckAssist ? 'text-primary' : 'op80'" @click="useCheckAssist = !useCheckAssist">
        {{ t('check-assist') }}
        <div v-if="useCheckAssist" square-btn-mark />
      </button>
      <button
        square-btn m2 :class="[
          useStrictMode ? 'text-primary' : 'op80',
          (!!currentMeta.tries?.length || topicNow !== 'chengyu4') ? 'op50 pointer-events-none' : '',
        ]" @click="useStrictMode = !useStrictMode"
      >
        {{ t('strict-mode') }}
        <div v-if="useStrictMode" square-btn-mark />
      </button>
    </div>
  </div>
</template>
