<script setup>
import { ref, onMounted } from 'vue'
import { fetchMessages, createMessage, subscribeToMessages } from '@/api.js'
import vMessage from '@/components/vMessage.vue'
import vInputForm from '@/components/vInputForm.vue'
import vScrollToBottomBtn from '@/components/vScrollToBottomBtn.vue'
import useStore from '@/stores'

const message = ref('')
const messages = ref([])
const store = useStore()
const page = ref(1)
const isNeedToScroll = ref(false)

function sendMessage() {
  if (message.value.length === 0) return

  createMessage({ text: message.value, author: store.getName(), country: store.getCountry() })
  message.value = ''
}

function scrollToBottom() {
  const el = document.getElementById('screen')
  setTimeout(() => el.scrollTo(0, el.scrollHeight))
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

function scrollHandler(e) {
  isNeedToScroll.value = e.target.scrollHeight - e.target.scrollTop > 1500
}

onMounted(() => {
  fetchMessages(page.value).then((data) => {
    messages.value = data.reverse()
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

  document.getElementById('screen').addEventListener('scroll', scrollHandler)
  document.getElementById('screen').addEventListener('touch', scrollHandler)
})
</script>

<template>
  <div
    class="md:rounded-3xl md:overflow-hidden bg-neutral-950 overflow-y-visible w-full h-full relative shadow-lg md:overflow-y-scroll md:-translate-x-1/2 md:-translate-y-1/2 md:h-5/6 md:aspect-3/4 md:w-auto md:absolute md:top-1/2 md:left-1/2"
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
    <v-scroll-to-bottom-btn :is-visible="isNeedToScroll" @click="scrollToBottom" />
    <v-input-form class="sticky bottom-0" v-model="message" @on-send-message="sendMessage" />
  </div>
</template>

<style lang="scss" scoped>
#screen {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
