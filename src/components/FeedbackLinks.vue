<script setup lang="ts">
import { t } from '~/i18n'
</script>

<template>
  <div pb2 op50>
    {{ t('feedback') }}
  </div>
  <div flex>
    <a
      square-btn mx2 flex-gap-1
      href="https://weibo.com/7485197193/Li2WLFosw"
      target="_blank"
    >
      <div i-ri-weibo-fill />
      {{ t('weibo-topic') }}
    </a>
    <!-- TODO: change content link after publish -->
    <a
      square-btn mx2 flex-gap-1
      href="https://t.bilibili.com/686126432908214293"
      target="_blank"
    >
      <div i-ri-bilibili-fill />
      {{ t('bilibili-post') }}
    </a>
  </div>
</template>
