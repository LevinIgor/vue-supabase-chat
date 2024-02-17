<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import { fetchMessages, createMessage, subscribeToMessagesInsert } from '@/api.js'
import vMessage from '@/components/vMessage.vue'
import vInputForm from '@/components/vInputForm.vue'
import vScrollToBottomBtn from '@/components/vScrollToBottomBtn.vue'
import useStore from '@/stores'

const store = useStore()
const message = ref('')
const messages = ref([])
const page = ref(1)
const isNeedScrollBottomBtn = ref(false)
const listAnimationName = ref('list')
const elements = reactive({
  screen: null,
  intersection: null
})

function sendMessage() {
  if (message.value.length === 0 || message.value.length > 1000) return

  createMessage({ text: message.value, author: store.getName(), country: store.getCountry() })
  message.value = ''
}

function scrollToBottom() {
  nextTick(() => elements.screen.scrollTo(0, elements.screen.scrollHeight))
}

function scrollHandler(e) {
  isNeedScrollBottomBtn.value = e.target.scrollHeight - e.target.scrollTop > 1500
}

async function infinityScrollCallback([entry]) {
  if (!entry.isIntersecting || messages.value.length == 0) return

  listAnimationName.value = ''
  messages.value.unshift(...(await fetchMessages(++page.value)).reverse())

  const height = elements.screen.scrollHeight
  nextTick(() => {
    elements.screen.scrollTo(0, elements.screen.scrollHeight - height)
    listAnimationName.value = 'list'
  })
}

function onMessageInsertCallback(obj) {
  messages.value.push(obj.new)
  if (obj.new.author === store.getName()) scrollToBottom()
}

onMounted(async () => {
  elements.screen = document.getElementById('screen')
  elements.intersection = document.getElementById('intersection')

  messages.value = (await fetchMessages(page.value)).reverse()
  scrollToBottom()

  subscribeToMessagesInsert(onMessageInsertCallback)

  new IntersectionObserver(infinityScrollCallback).observe(elements.intersection)

  elements.screen.addEventListener('scroll', scrollHandler)
})
</script>

<template>
  <div
    class="md:rounded-3xl md:overflow-hidden bg-neutral-950 overflow-y-visible w-full h-full relative shadow-lg md:overflow-y-scroll md:-translate-x-1/2 md:-translate-y-1/2 md:h-5/6 md:aspect-3/4 md:w-auto md:absolute md:top-1/2 md:left-1/2"
    id="screen"
  >
    <div class="flex flex-col gap-4 px-3 pt-10 min-h-full">
      <div class="h-10" id="intersection"></div>
      <transition-group :name="listAnimationName">
        <v-message
          v-for="item in messages"
          :key="item.id"
          :item="item"
          :is-user-message="item.author === store.getName()"
        />
      </transition-group>
    </div>

    <v-scroll-to-bottom-btn :is-visible="isNeedScrollBottomBtn" @click="scrollToBottom" />
    <v-input-form class="sticky bottom-0" v-model="message" @on-send-message="sendMessage" />
  </div>
</template>

<style lang="scss" scoped>
#screen {
  &::-webkit-scrollbar {
    display: none;
  }
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
