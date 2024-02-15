<script setup>
import { ref, onMounted } from 'vue'
import { fetchMessages, createMessage, subscribeToMessages } from '@/api.js'
import vMessage from '@/components/vMessage.vue'
import vInputForm from '@/components/vInputForm.vue'

import useStore from '@/stores'

const message = ref('')
const messages = ref([])
const store = useStore()
const page = ref(1)

function sendMessage() {
  if (message.value.length === 0) return

  createMessage({ text: message.value, author: store.getName(), country: store.getCountry() })
  message.value = ''
}

function scrollToBottom() {
  setTimeout(() => document.getElementById('screen').scrollTo(0, document.body.scrollHeight))
}

function infinityScroll(entry) {
  if (!entry.isIntersecting || messages.value.length == 0) return

  const el = document.getElementById('screen')
  const height = el.scrollHeight

  fetchMessages(++page.value).then((data) => {
    messages.value.unshift(...data.reverse())
    setTimeout(() => document.getElementById('screen').scrollTo(0, el.scrollHeight - height))
  })
}

onMounted(() => {
  fetchMessages(page.value).then((data) => {
    messages.value = data
    scrollToBottom()
  })

  subscribeToMessages((obj) => {
    messages.value.push(obj.new)
  })

  const observer = new IntersectionObserver((entries) => infinityScroll(entries[0]), {
    threshold: 0.1,
    rootMargin: '10px'
  })

  observer.observe(document.querySelector('#intersection'))
})
</script>

<template>
  <div
    class="bg-neutral-950 overflow-y-visible w-full h-full relative content md:overflow-y-scroll md:-translate-x-1/2 md:-translate-y-1/2 md:h-5/6 md:aspect-3/4 md:w-auto md:absolute md:top-1/2 md:left-1/2"
    id="screen"
  >
    <div class="flex flex-col gap-4 px-3 pt-10 min-h-full">
      <div class="h-10" id="intersection"></div>
      <v-message
        v-for="item in messages"
        :key="item.id"
        :item="item"
        :is-user-message="item.author === store.getName()"
      />
    </div>

    <v-input-form class="sticky bottom-0" v-model="message" @on-send-message="sendMessage" />
  </div>
</template>

<style lang="scss" scoped>
.content {
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1e1e1e;
  }

  &::-webkit-scrollbar-track {
    background: #535353;
  }
}
</style>
