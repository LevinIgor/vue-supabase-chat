<script setup>
import userIcon from '@/components/user-icon.vue'
import useStore from '@/stores'
import getRandomName from '@/utils/getRandomName'

const store = useStore()
</script>
<template>
  <header class="fixed top-0 left-0 w-full p-3 bg-black-100 flex justify-center z-10 select-none">
    <div class="flex items-center justify-between w-full">
      <h1 class="font-medium animate-charcter">Realtime Chat</h1>

      <div class="flex items-center gap-3">
        <span
          class="text-base font-medium cursor-pointer whitespace-pre"
          id="name"
          @click="store.setName(getRandomName())"
          >{{ store.getName() }}</span
        >
        <user-icon class="w-5 h-5" />
      </div>
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

.animate-charcter {
  text-transform: uppercase;
  background-image: linear-gradient(-225deg, #32963a 0%, #3fa321 29%, #1ad896 67%, #80ff00 100%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: text_clip 3s linear infinite;
  display: inline-block;
}

@keyframes text_clip {
  to {
    background-position: 200% center;
  }
}
</style>
