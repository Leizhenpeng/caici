<script lang="ts" setup>
import { defineProps } from 'vue'

const props = withDefaults(defineProps<{
  keyName: string
  keyDescription?: string
  keyType: 'str' | 'btn'
  keyValue?: string
}>(), {
  keyType: 'str',
})
const { keyType } = props
</script>

<template>
  <div
    flex="~ between row" px-2 py-1 rounded hover:bg-dark hover:bg-op-6 class="hover:dark:bg-white hover:dark:bg-op-6"
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
      <n-switch size="medium" />
    </div>
  </div>
</template>
