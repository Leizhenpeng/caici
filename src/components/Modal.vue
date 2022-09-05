<script setup lang='ts'>
import { modelMaxHeight } from '~/state'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  direction?: 'top' | 'right' | 'bottom' | 'left'
  mask?: boolean
}>(), {
  modelValue: false,
  direction: 'top',
  mask: true,
})

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const positionClass = computed(() => {
  switch (props.direction) {
    case 'bottom':
      return 'bottom-0 left-0 right-0 border-t'
    case 'top':
      return 'top-0 left-0 right-0 border-b'
    case 'left':
      return 'bottom-0 left-0 top-0 border-r w-max'
    case 'right':
      return 'bottom-0 top-0 right-0 border-l w-max'
    default:
      return ''
  }
})

const containerPositionClass = computed(() => {
  if (props.mask)
    return 'bottom-0 left-0 right-0 top-0'
  switch (props.direction) {
    case 'bottom':
      return 'bottom-0 left-0 right-0'
    case 'top':
      return 'top-0 left-0 right-0'
    case 'left':
      return 'bottom-0 left-0 top-0'
    case 'right':
      return 'bottom-0 top-0 right-0'
    default:
      return ''
  }
})

const transform = computed(() => {
  switch (props.direction) {
    case 'bottom':
      return 'translateY(100%)'
    case 'top':
      return 'translateY(-100%)'
    case 'left':
      return 'translateX(-100%)'
    case 'right':
      return 'translateX(100%)'
    default:
      return ''
  }
})
const contentRef = ref()
onMounted(() => {
  // contentRef.value?.scrollTo({ left: 12000, behavior: 'smooth' })
})

function scrollTopModel() {
  contentRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
}
defineExpose({
  scrollTopModel,
})
</script>

<template>
  <div fixed z-40 :class="[containerPositionClass, modelValue ? '' : 'pointer-events-none']">
    <div
      v-if="mask" class="bg-base left-0 right-0 top-0 bottom-0 absolute transition-opacity duration-500 ease-out"
      :class="modelValue ? 'opacity-50' : 'opacity-0'" @click="$emit('update:modelValue', false)"
    />
    <div
      class="bg-base border-base absolute transition-all duration-200 ease-out max-w-screen max-h-screen overflow-auto scrolls"
      :class="[positionClass]" :style="modelValue ? {} : { transform }"
    >
      <n-scrollbar
        ref="contentRef"
        :style="{
          maxHeight: `${modelMaxHeight}px`,
        }"
      >
        <slot />
      </n-scrollbar>
    </div>
  </div>
</template>
