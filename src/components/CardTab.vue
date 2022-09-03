<script setup lang="ts">
withDefaults(defineProps<{
  content: string | undefined
  ifNeedStrong?: boolean
  ifNeedIndent?: boolean
  height?: number
}>(), {
  height: 300,
  ifNeedIndent: true,
  ifNeedStrong: false,
})

function seperateByLine(content: string | undefined) {
  if (!content)
    return []
  return content.split('\n')
}
function addStrongTagAfterColon(content: string | undefined) {
  if (!content)
    return ''
  return content.replace(/(^.*?)：/g, '<strong>$1</strong>：')
}
</script>

<template>
  <div>
    <n-scrollbar
      :style="{
        maxHeight: `${height}px`,
      }"
    >
      <div v-if="!ifNeedStrong">
        <p
          v-for="(itemP, index) in seperateByLine(content)" :key="index" mb-1 leading-relaxed text-sm px-2
          :class="[ifNeedIndent ? 'indent-md' : '']"
        >
          {{ itemP }}
        </p>
      </div>
      <div v-else>
        <p
          v-for="(itemP, index) in seperateByLine(content)" :key="index" mb-1 leading-relaxed ml-1 text-left text-sm px-2
          v-html="addStrongTagAfterColon(itemP) "
        />
      </div>
    </n-scrollbar>
  </div>
</template>

<style lang="scss" scoped>

</style>
