<script setup lang="ts">
import type { SpMode } from '@hankit/tools'
import { useMotions } from '@vueuse/motion'
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
const languageOptions = ref(
  [
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
    label: t('theme-light'),
    check: true,
  },
  {
    value: true,
    label: t('theme-dark'),
    check: false,
  },
])
const inputModeOptions = ref([
  {
    value: 'py',
    label: t('pinyin'),
    check: true,
  },
  {
    value: 'zy',
    label: t('zhuyin'),
    check: false,
  },
  {
    value: 'sp',
    label: t('shuangpin'),
    check: false,
  },
])

const spModeOptions = ref([
  {
    value: 'sougou',
    label: t('shuangpin-sougou'),
    check: true,
  },
  {
    value: 'xiaohe',
    label: t('shuangpin-xiaohe'),
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
    label: t('tone-symbol'),
    check: true,
  },
  {
    value: true,
    label: t('tone-number'),
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
    const theme = value!.find(item => item.check) as { value: boolean }
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

const funcCheckedNow = computed(
  () => {
    return changeLevel.value[0].startsWith('1')
  },
)

const StyleCheckedNow = computed(
  () => {
    return changeLevel.value[1].startsWith('1')
  },
)

const motions = useMotions()
function delayTap(func: () => void) {
  setTimeout(() => {
    func()
  }, 300)
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
    <div
      flex="~  wrap col gap-1" relative px-2 py-2 mt-4 min-w-370px mxa bg-dark bg-op-2 dark:bg-white dark:bg-op-2
      rounded :class="[StyleCheckedNow ? 'op-40 blur-3 pointer-events-none ' : '']"
    >
      <div flex="~ row" justify-start items-center w-fit pl2 pt-1 icon-btn @click="checkBack()">
        <div v-if="funcCheckedNow" i-carbon-undo />
        <p text-base font-serif>
          <b v-show="!funcCheckedNow" class="font-base-color!"> {{ t('setting-func') }} </b>
          <b v-if="changeLevel[0] === '1-0'"> {{ t('setting-change-dot') }}{{ t('yinbiao') }}</b>
          <b v-if="changeLevel[0] === '1-1'"> {{ t('setting-change-dot') }}{{ t('pinfa') }} </b>
          <b v-if="changeLevel[0] === '1-2'"> {{ t('setting-change-dot') }}{{ t('shenxing') }}</b>
        </p>
      </div>

      <div v-if="changeLevel[0] === '0'" ref="el" v-motion-right-slide-in flex="~  wrap col gap-1">
        <SettingMeta
          :key-name="t('zhuyin')" :key-description="t('zhuyin-des')" :key-value="currentInputModeValue"
          @click-all="delayTap(() => changeLevel[0] = '1-0')"
        />
        <SettingMeta
          v-show="inputMode === 'sp'" :key-name="t('pinfa')" :key-description="t('pinfa-des')"
          :key-value="currentSpModeValue" :if-disabled="inputMode !== 'sp'"
          @click-all="
            delayTap(() =>
              changeLevel[0] = '1-1')"
        />
        <SettingMeta
          v-show="inputMode === 'py'" :key-name="t('shengxing')" :key-description="t('shengxing-des')"
          :key-value="currentToneValue"
          @click-all="
            delayTap(() =>
              changeLevel[0] = '1-2')"
        />
        <SettingMeta
          v-model="useStrictMode" :key-name="t('yueshu')" :key-description="t('yueshu-des')" key-type="btn"
        />
      </div>
      <Transition :css="false" @leave="(el: Element, done: any) => motions.metaCheck1.leave(done)">
        <div
          v-if="funcCheckedNow" v-motion="'metaCheck1'" :style="{ minHeight: `${tempHeight1}px` }"
          :initial="{ x: -400, opacity: 0 }" :enter="{
            x: 0,
            opacity: 1,
            height: tempHeight1,
            transition: { type: 'spring', stiffness: 250, damping: 25, mass: 0.5 },
          }" :leave="{
            position: 'absolute',
            top: '40px',
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0,
            x: -400,
            transition: {
              type: 'spring',
              stiffness: 250,
              damping: 25,
              mass: 0.5,
            },

          }"
        >
          <SettingMetaCheck
            v-if="changeLevel[0].endsWith('0')" v-model:options="inputModeOptions"
            @on-checked="checkBack(0)"
          />
          <SettingMetaCheck
            v-else-if="changeLevel[0].endsWith('1')" v-model:options="spModeOptions"
            @on-checked="checkBack(0)"
          />
          <SettingMetaCheck
            v-else-if="changeLevel[0].endsWith('2')" v-model:options="toneOptions"
            @on-checked="checkBack(0)"
          />
        </div>
      </Transition>
    </div>

    <div
      flex="~  wrap col gap-1" px-2 py-2 mt-4 min-w-370px mxa bg-dark bg-op-2 dark:bg-white dark:bg-op-2 rounded
      :class="[funcCheckedNow ? 'op-40 blur-3 pointer-events-none ' : '']"
    >
      <div flex="~ row" justify-start items-center w-fit pl2 pt-1 icon-btn @click="checkBack(1)">
        <div v-if="StyleCheckedNow" i-carbon-undo />
        <p text-base font-serif>
          <b v-show="!StyleCheckedNow" class="font-base-color!"> {{ t('setting-show') }} </b>
          <b v-if="changeLevel[1] === '1-0'"> {{ t('setting-change-dot') }}{{ t('yongyan') }} </b>
          <b v-if="changeLevel[1] === '1-1'"> {{ t('setting-change-dot') }}{{ t('yongse') }} </b>
        </p>
      </div>
      <div v-if="changeLevel[1] === '0'" ref="el1" v-motion-right-slide-in flex="~  wrap col gap-1">
        <SettingMeta
          :key-name="t('yongyan')" :key-description="t('yongyan-des')" :key-value="currentLanguageValue"
          @click-all="
            delayTap(() =>
              changeLevel[1] = '1-0')"
        />
        <SettingMeta
          :key-name="t('yongse')" :key-description="t('yongse-des')" :key-value="currentThemeValue"
          @click-all="
            delayTap(() =>
              changeLevel[1] = '1-1')"
        />
        <SettingMeta v-model="useHint" :key-name="t('fuyan')" :key-description="t('fuyan-des')" key-type="btn" />
        <SettingMeta v-model="useCheckAssist" :key-name="t('fuzhu')" :key-description="t('fuzhu-des')" key-type="btn" />
        <SettingMeta v-model="colorblind" :key-name="t('fushi')" :key-description="t('fushi-des')" key-type="btn" />
      </div>
      <Transition :css="false" @leave="(el: Element, done: any) => motions.metaCheck2.leave(done)">
        <div
          v-if="StyleCheckedNow" v-motion="'metaCheck2'" :initial="{ x: -400, opacity: 0 }" :enter="{
            x: 0,
            opacity: 1,
            height: tempHeight2,
            transition: { type: 'spring', stiffness: 250, damping: 25, mass: 0.5 },
          }" :leave="{
            position: 'absolute',
            top: '40px',
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0,
            x: -400,
            transition: {
              type: 'spring',
              stiffness: 250,
              damping: 25,
              mass: 0.5,
            },

          }" :style="{ minHeight: `${tempHeight2}px` }"
        >
          <SettingMetaCheck
            v-if="changeLevel[1].endsWith('0')" v-model:options="languageOptions"
            @on-checked="checkBack(1)"
          />
          <SettingMetaCheck
            v-if="changeLevel[1].endsWith('1')" v-model:options="themeOptions"
            @on-checked="checkBack(1)"
          />
        </div>
      </Transition>
    </div>
    <div mt-8 />
  </div>
</template>
