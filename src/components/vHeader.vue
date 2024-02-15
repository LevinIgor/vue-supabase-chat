<script setup>
import useStore from '@/stores'

const store = useStore()
</script>
<template>
  <header class="fixed top-0 left-0 w-full p-3 bg-black-100 flex justify-center z-10">
    <div class="flex items-center justify-between w-full">
      <h2 class="text-green-600">Vue.js + Supabase Realtime = Chat</h2>
      <span class="text-base font-medium cursor-pointer">{{ store.getName() }}</span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  border-bottom: 1px solid #414141;

  div {
    max-width: var(--content-width);
  }
}
</style>
