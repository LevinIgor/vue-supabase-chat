<script setup>
import pulseDotIcon from '@/components/pulse-dot-icon.vue'
import messagesIcon from '@/components/messages-icon.vue'
import usersIcon from '@/components/users-icon.vue'
import countryIcon from '@/components/country-icon.vue'
import vSelect from '@/components/vSelect.vue'

import { computed } from 'vue'
import useStore from '@/store'

const store = useStore()

const stats = computed(() => store.projectStats)
</script>
<template>
  <div
    class="bg-neutral-950 w-full flex items-center justify-between p-3 md:rounded-t-lg"
    id="messages-header"
  >
    <div class="flex items-center gap-2 cursor-pointer" title="Online">
      <pulse-dot-icon />
      <span class="text-green-500">{{ stats.online }}</span>
    </div>
    <div class="flex items-center gap-2 cursor-pointer" title="Messages count">
      <messages-icon />
      <span>{{ stats.message_count }}</span>
    </div>
    <div class="flex items-center gap-2 cursor-pointer" title="Viewers">
      <users-icon />
      <span>{{ stats.viewers }}</span>
    </div>
    <v-select :items="stats.countries">
      <div class="flex items-center gap-2 cursor-pointer" title="Countries count">
        <countryIcon />
        <span>{{ (stats.countries || []).length }}</span>
      </div>
    </v-select>
  </div>
</template>

<style lang="scss" scoped></style>
