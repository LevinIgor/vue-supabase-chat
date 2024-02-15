<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'onSendMessage'])
const maxlength = 500

function sendMessage() {
  const el = document.getElementById('message-input')
  if (props.modelValue.length === 0 || el.textContent.length > maxlength) return
  emits('onSendMessage')
  document.getElementById('message-input').textContent = ''
}

function update(e) {
  setTimeout(() => {
    emits('update:modelValue', e.target.textContent)
  })
}
</script>
<template>
  <div class="w-full bg-black-100 mt-52 form-input">
    <span
      class="max-h-40 w-full block overflow-y-scroll text-lg pt-4 pb-5 px-3 bg-neutral-800 outline-none border-none"
      style="white-space: pre-wrap"
      role="textarea"
      id="message-input"
      contenteditable
      @keypress.enter.exact.prevent="sendMessage"
      @keydown="update"
    ></span>
    <span
      class="absolute bottom-2 right-4 font-thin text-sm"
      :class="props.modelValue.length > maxlength ? 'text-red-400' : 'text-white'"
      >{{ props.modelValue.length }} / {{ maxlength }}</span
    >
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

  background: linear-gradient(180deg, rgba(#1a1a1a, 0), rgba(#000000, 100) 100%);
}

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
