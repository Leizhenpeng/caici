<script setup lang="ts">
import { showTogetherShare } from '~/state'
import { t } from '~/i18n'

const shareType = ref<'text' | 'image' | null>()
watch(showTogetherShare, (v) => {
  if (!v)
    shareType.value = null
})
</script>

<template>
  <div flex="~ col" p6 items-center relative>
    <div absolute top-4 right-4 flex="~">
      <button icon-btn @click="showTogetherShare = false">
        <div i-carbon-close />
      </button>
    </div>
    <div v-if="shareType" absolute top-4 left-4 flex="~">
      <button icon-btn @click="shareType = null">
        <div i-carbon-arrow-left />
      </button>
    </div>

    <p text-xl font-serif mb4>
      <b>
        请柬书
      </b>
    </p>
    <template v-if="!shareType">
      <div>
        {{ t('select-share-method') }}
      </div>
      <div grid="~ cols-2 gap-2" my4>
        <button flex="~ col center" border="~ base" p4 op80 class="hover:op100 hover:bg-gray:5" w-30 h-30 @click="shareType = 'text'">
          <div i-ep-tickets text-10 op70 mb1 />
          <div>{{ '复制文本' }}</div>
        </button>
        <button flex="~ col center" border="~ base" p4 op80 class="hover:op100 hover:bg-gray:5" w-30 h-30 @click="shareType = 'image'">
          <div i-ep-picture text-10 op70 mb1 />
          <div>{{ '发送图片' }}</div>
        </button>
      </div>
    </template>
    <template v-if="shareType === 'text'">
      <InviteText />
      <!-- <SocialLinks /> -->
    </template>
    <template v-if="shareType === 'image'">
      <InviteImage />
      <!-- <SocialLinks /> -->
    </template>
  </div>
</template>
