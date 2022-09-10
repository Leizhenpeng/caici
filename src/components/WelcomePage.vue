<script setup lang="ts">
import { LINK_GITHUB } from '../logic/constants'
import { isDark, nowTopic, nowTopicExample, nowTopicTitleShort, showBrandShareDialog, showHelp, showPrivacyNotes, showVariants, useMask } from '~/state'
import { initialized, topicNow, wordLengthNow } from '~/storage'
import { t } from '~/i18n'

const props = withDefaults(defineProps <{
  ifSolo?: boolean
}>(), {
  ifSolo: true,
})
function start() {
  showHelp.value = false
  useMask.value = false
  initialized.value = true
}

function variantButton() {
  showVariants.value = true
}

function privacyButton() {
  showPrivacyNotes.value = true
}

// const final = computed(() => ({
//   py: 'uo',
//   zy: 'ㄨㄛ',
//   sp: 'o',
// }[inputMode.value]))

// 获取当前话题例子
const nowTopicExampleS1 = computed(
  () => {
    if (topicNow.value === 'chengyu4')
      return t('example.chengyu4.s1')
    if (topicNow.value === 'shici5')
      return t('example.shici5.s1')
    if (topicNow.value === 'shici7')
      return t('example.shici7.s1')
    else
      return t('example.chengyu4.s1')
  },
)

const nowTopicExampleS1_font = computed(
  () => {
    if (topicNow.value === 'chengyu4')
      return t('intro-5')
    if (topicNow.value === 'shici5')
      return t('example.shici5.s1.word')
    if (topicNow.value === 'shici7')
      return t('example.shici7.s1.word')
    else
      return t('example.chengyu4.s1')
  },
)

const nowTopicExampleS2 = computed(
  () => {
    if (topicNow.value === 'chengyu4')
      return t('example.chengyu4.s2')
    if (topicNow.value === 'shici5')
      return t('example.shici5.s2')
    if (topicNow.value === 'shici7')
      return t('example.shici7.s2')
    else
      return t('example.chengyu4.s1')
  },
)
const nowTopicExampleS2_font = computed(
  () => {
    if (topicNow.value === 'chengyu4')
      return t('intro-8')
    if (topicNow.value === 'shici5')
      return t('example.shici5.s2.word')
    if (topicNow.value === 'shici7')
      return t('example.shici7.s2.word')
    else
      return t('example.chengyu4.s1')
  },
)
const nowTopicExampleS3 = computed(
  () => {
    if (topicNow.value === 'chengyu4')
      return t('example.chengyu4.s3')
    if (topicNow.value === 'shici5')
      return t('example.shici5.s3')
    if (topicNow.value === 'shici7')
      return t('example.shici7.s3')
    else
      return t('example.chengyu4.s1')
  },
)
const nowTopicExampleS3_font = computed(
  () => {
    if (topicNow.value === 'chengyu4')
      return t('intro-14')
    if (topicNow.value === 'shici5')
      return t('example.shici5.s3.word')
    if (topicNow.value === 'shici7')
      return t('example.shici7.s3.word')
    else
      return t('example.chengyu4.s1')
  },
)
const nowTopicExampleS4 = computed(
  () => {
    if (topicNow.value === 'chengyu4')
      return t('example.chengyu4.s4')
    if (topicNow.value === 'shici5')
      return t('example.shici5.s4')
    if (topicNow.value === 'shici7')
      return t('example.shici7.s4')
    else
      return t('example.chengyu4.s1')
  },
)
function share() {
  showHelp.value = false
  showBrandShareDialog.value = true
}
</script>

<template>
  <div p="x5 y10" flex="~ col gap-2 y-center" relative>
    <div absolute top-4 right-4 flex="~ gap-3">
      <button icon-btn @click="share">
        <div i-carbon-share />
      </button>
    </div>

    <AppName h="2.5rem" />
    <div mt--1 op50 text-sm>
      {{ t('description') }}
    </div>

    <div h-1px w-10 border="b base" m4 />

    <p text-xl font-serif mb4>
      <b>{{ t('rule') }}·{{ nowTopicTitleShort }}</b>
    </p>
    <div flex="~ center col">
      <p>{{ t('intro-1') }} <b text-ok>{{ nowTopic }}</b>。</p>
      <p mt2>
        {{ t('intro-3') }}
      </p>
      <p mt2>
        {{ t('intro-10') }} <b>{{ t('intro-11') }}</b> {{ t('intro-12') }}
      </p>
      <p mt6 w-full text-center>
        {{ t('intro-21') }}
      </p>
    </div>
    <WordBlocks :word-length="wordLengthNow" my1 :word="nowTopicExampleS1" :revealed="true" :animate="false" :answer="nowTopicExample" />
    <p>{{ t('intro-4') }} <b text-ok>{{ nowTopicExampleS1_font }}</b> {{ t('intro-6') }}</p>

    <WordBlocks my2 :word-length="wordLengthNow" :word="nowTopicExampleS2" :revealed="true" :animate="false" :answer="nowTopicExample" />
    <p>{{ t('intro-4') }} <b text-mis>{{ nowTopicExampleS2_font }}</b> {{ t('intro-9') }}</p>

    <WordBlocks my2 :word-length="wordLengthNow" :word="nowTopicExampleS3" :revealed="true" :animate="false" :answer="nowTopicExample" />
    <p max-w-130>
      {{ t('intro-4') }} <b op50>{{ nowTopicExampleS3_font }}</b> {{ t('intro-15') }}
      {{ t('intro-19') }}
    </p>

    <WordBlocks my2 :word-length="wordLengthNow" :word="nowTopicExampleS4" :revealed="true" :animate="false" :answer="nowTopicExample" />
    <p>{{ t('intro-20') }}</p>

    <div h-1px w-10 border="b base" m4 />

    <button btn p="x4 y2" @click="start()">
      <span v-if="!initialized" tracking-1 pl1>{{ t('start') }}</span>
      <span v-else tracking-1 pl1>{{ t('backGame') }}</span>
    </button>
    <div op50>
      {{ t('update-tip') }}
    </div>

    <div v-if="ifSolo" h-1px w-10 border="b base" m4 />

    <ChooseTopic v-if="ifSolo" :lite="true" />

    <div h-1px w-10 border="b base" m4 />

    <FeedbackLinks />

    <div h-1px w-10 border="b base" m4 />

    <div cursor-pointer op50 hover:op80 @click="privacyButton()">
      {{ t('privacy-notes') }}
    </div>
    <button text-primary op80 hover:op100 @click="variantButton()">
      {{ t('other-variants') }}
    </button>
    <div>
      <span op40>inspired by </span><a href="https://handle.antfu.me/" target="_blank" op50 hover:op80>Handle</a>
      <span op40>, made by </span>
      <a op50 hover:op80 href="https://github.com/Leizhenpeng" target="_blank">River</a>
    </div>
    <a :href="LINK_GITHUB" target="_blank" flex="~ center gap-1" op50 hover:op80>
      <div i-carbon-logo-github />
      Source Code
    </a>
  </div>
</template>
