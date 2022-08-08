<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps<{
  keyName: string
  keyDescription?: string
  keyValue?: string
}>()
</script>

<template>
  <div
    flex="~ between row" px-2 py-1 rounded hover:bg-dark hover:bg-op-6 class="hover:dark:bg-white hover:dark:bg-op-6"
    font-serif
  >
    <div flex="~ col justify-start">
      <p text-md>
        {{ keyName }}
      </p>
      <p v-if="keyDescription!" text-xs>
        {{ keyDescription }}
      </p>
    </div>

    <slot name="key">
      {{ keyValue }}
    </slot>
  </div>
</template>
