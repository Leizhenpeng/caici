<script lang="ts" setup>
import { DAYS_PLAY_BACK } from '~/logic/constants'
import { answer, dayNo, daySince, isDev } from '~/state'
</script>

<template>
  <div p="4">
    <NoQuizToday v-if="!answer.word" />
    <NoFuturePlay v-else-if="dayNo > daySince && !isDev" />
    <NoPastPlay v-else-if="daySince - dayNo > DAYS_PLAY_BACK && !isDev" />
    <Play v-else />
  </div>
</template>

<style lang="scss" scoped>
</style>
