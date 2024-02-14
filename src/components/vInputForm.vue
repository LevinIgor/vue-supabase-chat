<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'onSendMessage'])
</script>
<template>
  <div class="fixed bottom-0 left-0 w-full bg-black-100 py-4 flex mt-52 form-input">
    <div class="mx-auto w-full max-w-[900px] flex">
      <span
        class="max-h-40 w-full block overflow-y-scroll text-lg p-3 bg-neutral-800 border border-neutral-700 rounded-lg"
        style="white-space: pre"
        role="textarea"
        id="message-input"
        placeholder="Type a message..."
        contenteditable
        wrap="hard"
        @keypress.enter.exact.prevent="emits('onSendMessage'), ($event.target.textContent = '')"
        @input="emits('update:modelValue', $event.target.textContent)"
      ></span>

      <div class="w-6 h-6 place-self-end ml-3 pb-10">
        <span
          class="bg-primary-500 text-white material-symbols-outlined"
          v-if="props.modelValue.length > 0"
          @click="sendMessage"
          >Send</span
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#message-input::-webkit-scrollbar {
  width: 0.5rem;
}

span[contenteditable]:empty::before {
  content: 'Type a message...';
}

.form-input::before {
  content: '';
  position: absolute;
  bottom: 100%;
  width: 100%;
  height: 100px;
  pointer-events: none;
  z-index: -1;

  background: linear-gradient(180deg, rgba(#1a1a1a, 0), rgba(#1a1a1a, 100) 100%);
}
</style>
