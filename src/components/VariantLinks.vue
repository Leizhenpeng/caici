<script setup lang="ts">
import { t } from '~/i18n'
</script>

<template>
  <div p5 flex="~ col center" class="variant-links">
    <p text-xl font-serif mb4>
      <b>{{ t('other-variants') }}</b>
    </p>
    <ul flex="~ col gap-3" text-left w-60 m2 list-disc>
      <li>
        <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank">Wordle</a> - by
        <a href="https://www.nytimes.com/">The New York Times</a>
      </li>
      <li>
        <a href="https://handle.antfu.me/" target="_blank">汉兜</a> - by <a href="https://twitter.com/antfu7">antfu</a>
      </li>
      <li>
        <a href="https://pinyincaichengyu.com" target="_blank">拼音猜成语</a> - by <a
          href="https://twitter.com/_limboy"
        >limboy</a>
      </li>
      <li>
        <a href="https://cheeaun.github.io/chengyu-wordle/" target="_blank">成语 Wordle</a> - by <a
          href="https://twitter.com/cheeaun"
        >Chee Aun</a>
      </li>
      <li>
        <a href="https://cy.surprising.studio/" target="_blank">词影</a> - by <a
          href="https://www.bilibili.com/video/BV1BZ4y1B73L"
        >qscqesze</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.variant-links a {
  color: var(--c-primary);
}

.variant-links a:hover {
  color: var(--c-primary-deep);
}
</style>
