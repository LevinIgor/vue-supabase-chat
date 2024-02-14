<script setup>
import { useTimeAgo } from '@vueuse/core'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const timeAgo = useTimeAgo(new Date(props.item.created_at))
</script>

<template>
  <div
    class="bg-zinc-800 p-3 rounded-lg shadow-lg border border-zinc-700 border-solid flex flex-col"
  >
    <span class="font-medium">{{ props.item.author }}</span>
    <p class="break-words pt-3 text-lg" style="white-space: pre-wrap">{{ props.item.text }}</p>
    <span class="w-full text-right text-xs text-neutral-500">
      {{ timeAgo }}
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
