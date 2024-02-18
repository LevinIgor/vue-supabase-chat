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
    <span v-if="props.isVisible">
      <chevron-down-icon class="p-2 box-content rounded-full" id="chevron-icon" />
    </span>
  </Transition>
</template>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.6s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}

#chevron-icon:hover {
  transition: transform 0.3s;
  transform: scale(1.1);
  background-image: radial-gradient(circle, rgba(61, 61, 61, 0.596), transparent);
}
</style>
