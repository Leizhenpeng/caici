<script setup lang="ts">
// TODO:change option
withDefaults(defineProps<{
  title?: string
  content?: string
}>(), {
  title: '飲酒',
  content: '结庐在人境，而无车马喧。\r\n问君何能尔？心远地自偏。\r\n采菊东篱下，悠然见南山。\r\n山气日夕佳，飞鸟相与还。\r\n此中有真意，欲辨已忘言。',
})
</script>

<template>
  <div>
    <div
      font-serif border-1px border-black dark:border-white border-op-10 dark:border-op-10 border-l-0
      w-300px py-2 pl-3 pr-4
      class="border-special"
    >
      <h3 text-left text-base font-bold>
        {{ title }}
      </h3>
      <p text-left class="max-line-4" pt-1>
        {{ content }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="css">
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
</style>
