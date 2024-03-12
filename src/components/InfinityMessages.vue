<script setup>
import vMessage from '@/components/vMessage.vue'
import vScrollToBottomBtn from '@/components/vScrollToBottomBtn.vue'

import { onMounted, ref, reactive, nextTick } from 'vue'
import { fetchMessages, subscribeToMessagesInsert } from '@/api'
import useStore from '@/store.js'

const store = useStore()
const page = ref(1)
const windowHeight = window.innerHeight
const marginY = windowHeight * 0.04
const isNeedToScrollBottom = ref(false)
const elementsHTML = reactive({
  content: null,
  intersection: null
})

const messages = ref([])
fetchMessages().then((data) => {
  messages.value = data.reverse()
})

subscribeToMessagesInsert((data) => {
  messages.value.push(data.new)
  store.incrementProjectMessageCount()

  if (data.new.author == store.getName()) {
    scrollToBottom()
  }
})

function scrollToBottom() {
  nextTick(() => {
    elementsHTML.content.scrollTo(0, elementsHTML.content.scrollHeight)
  })
}

onMounted(() => {
  elementsHTML.intersection = document.getElementById('intersection')
  elementsHTML.content = document.getElementById('infinity-comments')

  new IntersectionObserver(async ([entries]) => {
    if (!entries.isIntersecting) return

    const height = elementsHTML.content.scrollHeight

    messages.value = [...(await fetchMessages(++page.value)).reverse(), ...messages.value]

    nextTick(() => {
      elementsHTML.content.scrollTo(
        0,
        document.getElementById('infinity-comments').scrollHeight - height
      )
    })
  }).observe(elementsHTML.intersection)

  elementsHTML.content.addEventListener('scroll', (event) => {
    isNeedToScrollBottom.value =
      event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight > 100
  })

  const headerHeight = document.getElementById('header').offsetHeight
  const footerHeight = document.getElementById('footer').offsetHeight
  const inputFormHeight = document.getElementById('input-form').offsetHeight
  const messagesHeaderHeight = document.getElementById('messages-header').offsetHeight

  const contentHeight =
    windowHeight -
    headerHeight -
    footerHeight -
    inputFormHeight -
    messagesHeaderHeight -
    marginY * 2

  elementsHTML.content.style.height = `${contentHeight}px`
})
</script>

<template>
  <div
    class="flex flex-col gap-3 bg-neutral-950 px-3 py-14 relative overflow-y-scroll"
    id="infinity-comments"
  >
    <div class="h-10" id="intersection"></div>

    <v-message
      v-for="item in messages"
      :key="item.id"
      :item="item"
      :is-user-message="item.author === store.getName()"
    />

    <v-scroll-to-bottom-btn
      class="sticky bottom-0 w-min ml-auto right-4 z-10 cursor-pointer"
      :is-visible="isNeedToScrollBottom"
      @click="scrollToBottom"
    />
  </div>
</template>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.list-leave-active {
  position: absolute;
}

#infinity-comments {
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

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a0;
  }

  box-shadow: inset 0px 0px 10px 10px #000;
}
</style>
