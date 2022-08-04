<script setup lang="ts">
import { LINK_BILIBILI, LINK_WEIBO } from '../logic/constants'
import { t } from '~/i18n'
</script>

<template>
  <div p4 mt2 op50>
    {{ t('join-community') }}
  </div>
  <div flex>
    <a square-btn mx2 flex-gap-1 :href="LINK_WEIBO" target="_blank">
      <div i-ri-weibo-line />
      {{ t('weibo-topic') }}
    </a>
    <a square-btn mx2 flex-gap-1 :href="LINK_BILIBILI" target="_blank">
      <div i-ri-bilibili-line />
      {{ t('bilibili-post') }}
    </a>
  </div>
</template>
