<script setup lang="ts">
import type { SpMode } from '@hankit/tools'
import { locale, t } from '~/i18n'
import { isDark, showSettings } from '~/state'
import {
  colorblind,
  currentMeta,
  inputMode,
  spMode,
  topicNow,
  useCheckAssist,
  useHint,
  useNumberTone as useNumberToneRaw,
  useStrictMode,
} from '~/storage'

defineProps<{
  lite?: boolean
}>()

function close() {
  showSettings.value = false
}

// index-0 功能 0: 一级 1-0: 二级-第一行 1-1: 二级-第二行 ...
// index-1 外观 0: 一级 1-0: 二级-第一行 1-1: 二级-第二行 ...
const changeLevel = ref(['0', '0'])
const languageOptions = ref([
  {
    value: 'hans',
    label: '简体',
    check: true,
  },
  {
    value: 'hant',
    label: '繁体',
    check: false,
  },
])
const themeOptions = ref([
  {
    value: false,
    label: '明亮风格',
    check: true,
  },
  {
    value: true,
    label: '暗色风格',
    check: false,
  },
])

const inputModeOptions = ref([
  {
    value: 'py',
    label: '拼音',
    check: true,
  },
  {
    value: 'zy',
    label: '注音',
    check: false,
  },
  {
    value: 'sp',
    label: '双拼',
    check: false,
  },
])

const spModeOptions = ref([
  {
    value: 'sougou',
    label: '搜狗双拼',
    check: true,
  },
  {
    value: 'xiaohe',
    label: '小鹤双拼',
    check: false,
  },
  // {
  //   value: 'ziranma',
  //   label: '自然码双拼',
  //   check: false,
  // },
])
const toneOptions = ref([
  {
    value: false,
    label: '符号声调',
    check: true,
  },
  {
    value: true,
    label: '数字声调',
    check: false,
  },
])

const el = ref(null)
const el1 = ref(null)
const { height: height1 } = useElementSize(el)
const { height: height2 } = useElementSize(el1)
const tempHeight1 = ref(0)
const tempHeight2 = ref(0)
watch(height1, (height) => {
  if (height > 1)
    tempHeight1.value = height
}, {
  immediate: true,
})
watch(height2, (height) => {
  if (height > 1)
    tempHeight2.value = height
}, {
  immediate: true,
})

watch((locale), () => {
  languageOptions.value.forEach((item) => {
    item.check = item.value === locale.value
  })
}, {
  immediate: true,
})

watch((isDark), () => {
  themeOptions.value.forEach((item) => {
    item.check = item.value === isDark.value
  })
}, {
  immediate: true,
})
watch((inputMode), () => {
  inputModeOptions.value.forEach((item) => {
    item.check = item.value === inputMode.value
  })
}, {
  immediate: true,
})
watch(
  (spMode),
  () => {
    spModeOptions.value.forEach((item) => {
      item.check = item.value === spMode.value
    })
  }, {
    immediate: true,
  },
)
watch(
  (useNumberToneRaw),
  () => {
    toneOptions.value.forEach((item) => {
      item.check = item.value === useNumberToneRaw.value
    })
  }, {
    immediate: true,
  },
)

watch(
  languageOptions,
  (value) => {
    const language = value.find(item => item.check) as { value: 'hans' | 'hant' | undefined }
    locale.value = language?.value
  }, {
    deep: true,
  },
)
watch(
  themeOptions,
  (value) => {
    const theme = value.find(item => item.check) as { value: boolean }
    isDark.value = theme?.value
  }, {
    deep: true,
  },
)
watch(
  inputModeOptions,
  (value) => {
    const mode = value.find(item => item.check) as { value: 'py' | 'zy' | 'sp' | undefined }
    inputMode.value = mode?.value
  }, {
    deep: true,
  },
)

watch(
  spModeOptions,
  (value) => {
    const mode = value.find(item => item.check) as { value: SpMode }
    spMode.value = mode?.value
  },
)
watch(
  toneOptions,
  (value) => {
    const tone = value.find(item => item.check) as { value: boolean }
    useNumberToneRaw.value = tone?.value
  }, {
    deep: true,
  },
)

const currentThemeValue = computed(
  () => {
    const _current = themeOptions.value.find(item => item.check)
    return _current?.label
  },
)
const currentLanguageValue = computed(
  () => {
    const _current = languageOptions.value.find(item => item.check)
    return _current?.label
  },
)
const currentInputModeValue = computed(
  () => {
    const _current = inputModeOptions.value.find(item => item.check)
    return _current?.label
  },
)
const currentSpModeValue = computed(
  () => {
    const _current = spModeOptions.value.find(item => item.check)
    return _current?.label
  },
)
const currentToneValue = computed(
  () => {
    const _current = toneOptions.value.find(item => item.check)
    return _current?.label
  },
)

const checkBack = (index = 0) => {
  setTimeout(() => {
    changeLevel.value[index] = '0'
  }, 300)
}

watch(
  showSettings,
  () => {
    checkBack()
    checkBack(1)
  },
)
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
    <div flex="~  wrap col gap-1" px-2 py-2 mt-4 min-w-370px mxa bg-dark bg-op-2 dark:bg-white dark:bg-op-2 rounded>
      <p text-md font-serif pl-2>
        <b> 功能 </b>
        <b v-if="changeLevel[0] === '1-0'"> - 改注译 </b>
        <b v-if="changeLevel[0] === '1-1'"> - 改拼法 </b>
        <b v-if="changeLevel[0] === '1-2'"> - 改声形 </b>
      </p>
      <div v-show="changeLevel[0] === '0'" ref="el" flex="~  wrap col gap-1">
        <SettingMeta key-name="注音" key-description="汉字的拼读方案" :key-value="currentInputModeValue" @click="changeLevel[0] = '1-0'" />
        <SettingMeta
          key-name="拼法" key-description="双拼的方案选择" :key-value="currentSpModeValue" :if-disabled="inputMode !== 'sp'"
          @click="changeLevel[0] = '1-1'"
        />
        <SettingMeta key-name="声形" key-description="拼音声调的样式" :key-value="currentToneValue" :if-disabled="inputMode === 'sp'" @click="changeLevel[0] = '1-2'" />
        <SettingMeta
          v-model="useStrictMode" key-name="约束" key-description="限制输入内容必须为相应的成语或古诗词" key-type="btn"
          :if-disabled="!!currentMeta.tries?.length || topicNow !== 'chengyu4'"
        />
      </div>
      <div v-show="changeLevel[0].startsWith('1')" :style="{ minHeight: `${tempHeight1}px` }">
        <SettingMetaCheck v-if="changeLevel[0].endsWith('0')" v-model:options="inputModeOptions" @on-checked="checkBack(0)" />
        <SettingMetaCheck v-else-if="changeLevel[0].endsWith('1')" v-model:options="spModeOptions" @on-checked="checkBack(0)" />
        <SettingMetaCheck v-else-if="changeLevel[0].endsWith('2')" v-model:options="toneOptions" @on-checked="checkBack(0)" />
      </div>
    </div>
    <div flex="~  wrap col gap-1" px-2 py-2 mt-4 min-w-370px mxa bg-dark bg-op-2 dark:bg-white dark:bg-op-2 rounded>
      <p text-md font-serif pl-2>
        <b> 外观 </b>
      </p>
      <div v-show="changeLevel[1] === '0'" ref="el1" flex="~  wrap col gap-1">
        <SettingMeta key-name="用言" key-description="这会影响到部分文案和提醒相关的功能" :key-value="currentLanguageValue" @click="changeLevel[1] = '1-0'" />
        <SettingMeta
          key-name="用色" key-description="主题色" :key-value="currentThemeValue"
          @click="changeLevel[1] = '1-1'"
        />
        <SettingMeta v-model="useHint" key-name="辅言" key-description="获取字音, 偏旁, 字形等方面的提醒" key-type="btn" />
        <SettingMeta v-model="useCheckAssist" key-name="辅助" key-description="当前尝试信息是否重复" key-type="btn" />
        <SettingMeta v-model="colorblind" key-name="辅示" key-description="改善色弱用户游戏体验" key-type="btn" />
      </div>
      <div v-show="changeLevel[1].startsWith('1')" :style="{ minHeight: `${tempHeight2}px` }">
        <SettingMetaCheck
          v-if="changeLevel[1].endsWith('0')" v-model:options="languageOptions"
          @on-checked="checkBack(1)"
        />
        <SettingMetaCheck
          v-if="changeLevel[1].endsWith('1')" v-model:options="themeOptions"
          @on-checked="checkBack(1)"
        />
      </div>
    </div>
  </div>
</template>
