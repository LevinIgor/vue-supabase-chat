<script setup>
import { ref, onMounted } from 'vue'
import vMessage from '@/components/vMessage.vue'
import vInputForm from '@/components/vInputForm.vue'
import { fetchMessages, createMessage, subscribeToMessages } from '@/api.js'

const message = ref('')
const messages = ref([])

function sendMessage() {
  if (message.value.length === 0) return

  createMessage({ text: message.value, author: 'Anonymous' })
  message.value = ''
}

function playSound() {
  const audio = new Audio('../../../public/sound/beep.mp3')
  audio.volume = 0.01
  audio.play()
}

onMounted(() => {
  fetchMessages().then((data) => {
    messages.value = data
  })

  subscribeToMessages((obj) => {
    messages.value.push(obj.new)
    playSound()
  })
})
</script>

<template>
  <div class="py-10 relative">
    <div class="mb-52 flex flex-col gap-10">
      <v-message v-for="item in messages" :key="item.id" :item="item" />
    </div>
    <v-input-form v-model="message" @on-send-message="sendMessage" />
  </div>
</template>

<style lang="scss" scoped></style>
