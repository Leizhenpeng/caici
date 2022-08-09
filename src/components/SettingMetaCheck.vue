<script lang="ts" setup>
const props = defineProps<{
  options?: Array<{
    value: string | boolean
    label: string
    check: boolean
  }>
}>()
const emit = defineEmits<{
  (e: 'update:options', value: any): void
  (e: 'onChecked', value: any): void
}>()
const cloneOneAndUncheck = (options: Array<{
  value: string | boolean
  label: string
  check: boolean
}>) => {
  return options.map(item => ({
    ...item,
    check: false,
  }))
}
const optionsModel = computed({
  get: () => props.options,
  set: value => emit('update:options', value),
})
function clickItem(item: any, index: number) {
  const newOptions = cloneOneAndUncheck(optionsModel.value!)
  newOptions[index].check = true
  optionsModel.value = newOptions
  emit('onChecked', item)
}
</script>

<template>
  <div v-for=" (item, id) in options" :key="id">
    <div
      flex="~ between gap-1" px-2 min-h-40px rounded font-serif
      class="hover:dark:bg-white hover:dark:bg-op-6 hover:bg-dark hover:bg-op-6" @click="clickItem(item, id)"
    >
      <p text-base>
        {{ item.label }}
      </p>
      <div v-if="item.check" i-carbon-checkmark ml-10px text-bold bg-ok />
    </div>
  </div>
</template>
