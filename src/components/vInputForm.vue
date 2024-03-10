<script setup>
import sendIcon from '@/components/send-icon.vue'
import { createMessage } from '@/api.js'
import useStore from '@/store.js'
import { ref } from 'vue'

const message = ref('')
const maxlength = 500
const store = useStore()

function sendMessage() {
  if (message.value.length < maxlength && message.value.length > 0) {
    createMessage({
      text: message.value,
      author: store.getName(),
      country: store.getCountry(),
      location: store.getLocation()
    })
    message.value = ''
  }
}
</script>
<template>
  <div class="w-full bg-neutral-950 p-3 md:rounded-b-lg" id="input-form">
    <form class="flex items-center gap-3" @submit.prevent="sendMessage">
      <input
        class="w-full h-full bg-neutral-900 text-neutral-100 p-3 rounded-lg"
        type="text"
        placeholder="Type a message..."
        :maxlength="maxlength"
        v-model="message"
      />
      <send-icon
        class="cursor-pointer box-content rounded-full p-3"
        id="send-icon"
        title="Send Message"
        @click="sendMessage"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
#message-input::-webkit-scrollbar {
  width: 0.5rem;
}

span[contenteditable]:empty::before {
  content: 'Type a message...';
}

#send-icon:hover {
  transition: all 0.3s;
  background-image: radial-gradient(circle, rgba(61, 61, 61, 0.596), transparent);
  transform: scale(1.1);
}
</style>
