<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { defineProps } from 'vue'

const props = withDefaults(defineProps<{
  keyName: string
  keyDescription?: string
  keyType?: 'str' | 'btn'
  keyValue?: string
  modelValue?: any
  ifDisabled?: boolean
}>(), {
  keyType: 'str',
  ifDisabled: false,
})
const emit = defineEmits(['update:modelValue'])
const el = ref(null)
const color = useCssVar('--c-ok', el)
const railStyle = ({
  focused,
  checked,
}: {
  focused: boolean
  checked: boolean
}) => {
  const style: CSSProperties = {}
  if (checked) {
    style.background = color.value
    if (focused)
      style.boxShadow = '0 0 0 2px #1d9c9c20'
  }
  return style
}

const { keyType } = props
</script>

<template>
  <div
    ref="el" flex="~ between row" px-2 py-1 rounded
    class="hover:dark:bg-white hover:dark:bg-op-6 hover:bg-dark hover:bg-op-6" :class="[ifDisabled ? 'op50' : '']"
    font-serif
  >
    <div flex="~ col justify-start">
      <p text-base>
        {{ keyName }}
      </p>
      <p v-if="keyDescription!" text-xs>
        {{ keyDescription }}
      </p>
    </div>

    <div v-if="keyType === 'str'" text-base>
      {{ keyValue }}
    </div>
    <div v-else-if="keyType === 'btn'">
      <n-switch
        :disabled="ifDisabled" :value="modelValue" :on-update:value="
          (value: boolean) => {
            emit('update:modelValue', value)
          }
        " size="medium" :rail-style="railStyle"
      />
    </div>
  </div>
</template>
