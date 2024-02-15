<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

function sendMessage() {
  if (props.modelValue.length === 0) return
  emits('onSendMessage')
  document.getElementById('message-input').textContent = ''
}

const emits = defineEmits(['update:modelValue', 'onSendMessage'])
</script>
<template>
  <div class="w-full bg-black-100 mt-52 form-input">
    <span
      class="max-h-40 w-full block overflow-y-scroll text-lg py-4 px-3 bg-neutral-800 outline-none"
      style="white-space: pre"
      role="textarea"
      id="message-input"
      placeholder="Type a message..."
      contenteditable
      wrap="hard"
      @keypress.enter.exact.prevent="sendMessage"
      @input="emits('update:modelValue', $event.target.textContent)"
    ></span>
  </div>
</template>

<style lang="scss" scoped>
#message-input::-webkit-scrollbar {
  width: 0.5rem;
}

span[contenteditable]:empty::before {
  content: 'Type a message...';
}

// .form-input::before {
//   content: '';
//   position: absolute;
//   bottom: 100%;
//   width: 100%;
//   height: 100px;
//   pointer-events: none;
//   z-index: -1;

//   background: linear-gradient(180deg, rgba(#1a1a1a, 0), rgba(#1a1a1a, 100) 100%);
// }

#send-button {
  transition: background-color 0.2s;
  animation: fadeIn 0.2s;

  &:hover {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.099) 0%, rgba(255, 255, 255, 0) 100%);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
