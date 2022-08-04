<script setup lang="ts">
import { LINK_BILIBILI, LINK_WEIBO } from '../logic/constants'
import { t } from '~/i18n'
</script>

<template>
  <div pb2 op50>
    {{ t('feedback') }}
  </div>
  <div flex>
    <a
      square-btn mx2 flex-gap-1
      :href="LINK_WEIBO"
      target="_blank"
    >
      <div i-ri-weibo-fill />
      {{ t('weibo-topic') }}
    </a>
    <!-- TODO: change content link after publish -->
    <a
      square-btn mx2 flex-gap-1
      :href="LINK_BILIBILI"
      target="_blank"
    >
      <div i-ri-bilibili-fill />
      {{ t('bilibili-post') }}
    </a>
  </div>
</template>
