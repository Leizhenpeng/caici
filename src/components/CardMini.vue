<script setup lang="ts">
import Mark from 'mark.js'

import { showMetaDetail } from '~/state'
// TODO:change option
const props = withDefaults(defineProps<{
  title?: string
  content?: string | undefined
  layout?: string
  answer?: string
  hightlight?: boolean
}>(), {
  title: '',
  content: '',
  layout: 'indent',
  hightlight: true,
})

function showDetail() {
  showMetaDetail.value = true
}
const mainContentStyle = computed(() => {
  if (props.layout === 'indent')
    return 'intent-style'
  return 'center-style'
})
const el = ref()
watch(
  () => {
    return {
      answer: props.answer,
    }
  },
  () => {
    const markInstance = new Mark('.waited-hl')
    if (props.hightlight && markInstance && props.answer) {
      setTimeout(() => {
        markInstance.mark(props.answer || '', {
          separateWordSearch: false,
          acrossElements: true,
          element: 'span',
          className: 'highlighted',
        })
      }, 0)
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="card-mini" @click="showDetail">
    <div
      font-serif border-1px border-black dark:border-white border-op-10 dark:border-op-10 border-l-0 w-300px py-2 pl-3 pr-4
      class="border-special cardMini" cursor-pointer select-none hover:op-80
    >
      <h3 text-center text-base font-bold>
        {{ title }}
      </h3>
      <p ref="el" class="max-line-4 waited-hl" pt-1 :class="[mainContentStyle]">
        {{ content }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.card-mini {
  .highlighted {
    /* border-bottom: 3px solid var(--c-primary); */
    position: relative;
  }

  .highlighted::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    width: 102%;
    height: 2px;
    border-radius: 4px;
    opacity: 0.6;
    background-color: var(--c-primary);
    -webkit-animation: slide-in-top .5s cubic-bezier(.25, .46, .45, .94) both;
    animation: slide-in-top .5s cubic-bezier(.25, .46, .45, .94) both
  }

  @keyframes slide-in-top {
    0% {
      -webkit-transform: translateY(-4px);
      transform: translateY(-4px);
      opacity: 0
    }

    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1
    }
  }
}
</style>

<style scoped lang="scss">
.max-line-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
}

.border-special {
  box-shadow: inset 2px 0 0 0 var(--c-primary)
}

.pre-wrap {
  white-space: pre-wrap
}

.intent-style {
  @extend.pre-wrap;
  line-height: 1.6;
  text-indent: 1.5em;
}

.center-style {
  @extend.pre-wrap;
  line-height: 1.6;
  text-align: center;
  margin-left: 0.6rem;
}
</style>
