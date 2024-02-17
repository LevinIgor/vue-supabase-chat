<script setup>
import chevronDownIcon from '@/components/chevron-down-icon.vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <Transition name="fade">
    <span
      class="sticky bottom-24 w-min block ml-auto mr-5 p-3 rounded-full text-right cursor-pointer z-10 fill-slate-50 hover:bg-neutral-900 hover:fill-neutral-100 hover:shadow-lg"
      v-if="props.isVisible"
    >
      <chevron-down-icon class="" />
    </span>
  </Transition>
</template>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-enter-from {
  opacity: 0;
}
</style>
