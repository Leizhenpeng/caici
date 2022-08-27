<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { useRoute } from 'vue-router'

const router = useRoute()
const wordFromUrl = router.query?.q as string
</script>

<template>
  <div p="4">
    <Multiplayer :pre-put-word="wordFromUrl" />
  </div>
</template>

<style lang="scss" scoped>
</style>
