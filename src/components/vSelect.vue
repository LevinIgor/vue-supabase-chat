<script setup>
import CountryFlag from 'vue-country-flag-next'
import downIcon from '@/components/down-icon.vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const target = ref(null)

onClickOutside(target, () => (isOpen.value = !isOpen.value))

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

const isOpen = ref(false)

const toggleHandler = () => {
  isOpen.value = !isOpen.value
}
</script>
<template>
  <div class="relative select-none">
    <div class="flex items-center gap-2 cursor-pointer" @click="toggleHandler" id="select">
      <slot></slot>
      <down-icon
        class="transition-all"
        :style="{ transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)' }"
      />
    </div>
    <div
      class="absolute right-0 top-0 translate-y-12 z-10 max-h-[200px] overflow-y-scroll bg-neutral-800 p-3 grid grid-cols-2 gap-2 w-[350px] dropdown shadow-neutral-800 shadow-md rounded-sm"
      v-if="isOpen"
      ref="target"
    >
      <div class="flex items-center gap-2" v-for="(item, index) in props.items" :key="index">
        <country-flag :country="item.country" size="small" />
        <span>{{ item.name }}</span>
        <span>{{ item.record_count }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  animation: fade 0.3s;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: #505050;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bbbbbb;
    border-radius: 0px;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
