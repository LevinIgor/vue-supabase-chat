<script setup>
import CountryFlag from 'vue-country-flag-next'

import { useTimeAgo } from '@vueuse/core'
import { ref } from 'vue'

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
const style = ref(
  props.isUserMessage
    ? 'ml-auto bg-neutral-800 text-left rounded-tr-3xl rounded-bl-3xl rounded-tl-3xl'
    : 'rounded-tr-3xl rounded-br-3xl rounded-tl-3xl bg-neutral-900'
)
</script>

<template>
  <div
    class="pt-4 pb-3 px-3 flex flex-col w-fit max-w-[90%] border border-neutral-700 border-solid"
    :class="style"
  >
    <div class="">
      <span class="font-medium">@{{ props.item.author }}</span>
      <span class="text-xs"> from</span>
      <span class="ml-1 text-sm font-light">{{ props.item.country }} - </span>
      <country-flag :country="props.item.country" size="small" />
    </div>
    <p class="break-words pt-3 text-base" style="white-space: pre-wrap">{{ props.item.text }}</p>
    <span class="w-full text-right text-xs text-neutral-500 select-none mt-5">
      {{ timeAgo }}
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
