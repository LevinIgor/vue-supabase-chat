<script setup>
import CountryFlag from 'vue-country-flag-next'

import { useTimeAgo } from '@vueuse/core'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isUserMessage: {
    type: Boolean,
    default: false
  }
})

const timeAgo = useTimeAgo(new Date(props.item.created_at))
</script>

<template>
  <div class="w-full flex" :class="isUserMessage ? 'justify-end' : 'justify-start'">
    <div class="px-3 flex flex-col w-fit max-w-[90%]">
      <div class="" :class="{ 'text-right': isUserMessage }">
        <span class="font-medium">@{{ props.item.author }}</span>
        <span class="text-xs"> from</span>
        <span class="ml-1 text-sm font-light">{{ props.item.country }} - </span>
        <country-flag :country="props.item.country" size="small" />
      </div>
      <div class="flex items-end gap-3" :class="{ 'flex-row-reverse': props.isUserMessage }">
        <p
          class="break-words py-1 px-4 text-base bg-neutral-900 w-fit max-w-[80%] rounded-2xl mt-2"
          :class="{ 'bg-opacity-90 ': props.isUserMessage }"
          style="white-space: pre-wrap"
        >
          {{ props.item.text }}
        </p>
        <span class="text-xs text-neutral-500 select-none">
          {{ timeAgo }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
