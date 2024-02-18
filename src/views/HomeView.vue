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
  createMessage({
    text: message.value,
    author: store.getName(),
    country: store.getCountry(),
    location: store.getLocation()
  })
  message.value = ''
}

function scrollToBottom() {
  nextTick(() => elements.screen.scrollTo(0, elements.screen.scrollHeight))
}

function scrollHandler(e) {
  isNeedScrollBottomBtn.value = e.target.scrollHeight - e.target.scrollTop > 2000
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

subscribeToMessagesInsert(onMessageInsertCallback)
function onMessageInsertCallback(obj) {
  messages.value.push(obj.new)
  if (obj.new.author === store.getName()) scrollToBottom()
}

fetchMessages(page.value).then((data) => ((messages.value = data.reverse()), scrollToBottom()))

onMounted(async () => {
  elements.screen = document.getElementById('screen')
  elements.intersection = document.getElementById('intersection')

  new IntersectionObserver(infinityScrollCallback).observe(elements.intersection)
  elements.screen.addEventListener('scroll', scrollHandler)
})
</script>

<template>
  <main class="h-screen w-full flex flex-col justify-center items-center">
    <div class="h-full w-full md:w-auto md:h-4/5 md:aspect-3/4 grid grid-rows-10 md:gap-4">
      <div
        class="overflow-y-scroll overflow-x-hidden row-span-9 flex flex-col gap-3 px-3 pb-32 bg-neutral-950 md:rounded-tl-lg"
        id="screen"
      >
        <div class="h-10" id="intersection"></div>
        <transition-group :name="listAnimationName">
          <v-message
            v-for="item in messages"
            :key="item.id"
            :item="item"
            :is-user-message="item.author === store.getName()"
          />
        </transition-group>
        <v-scroll-to-bottom-btn
          class="sticky -bottom-20 w-min ml-auto right-4 z-10 cursor-pointer"
          :is-visible="isNeedScrollBottomBtn"
          @click="scrollToBottom(), (isNeedScrollBottomBtn = false)"
        />
      </div>
      <v-input-form class="row-span-1" v-model="message" @on-send-message="sendMessage" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
#screen {
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
</style>
