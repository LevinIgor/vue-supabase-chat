<script setup>
import sendIcon from '@/components/send-icon.vue'
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'onSendMessage'])
const maxlength = 500

function sendMessage() {
  if (props.modelValue.length < maxlength && props.modelValue.length > 0) emits('onSendMessage')
}
</script>
<template>
  <div class="w-full bg-neutral-950 p-3 md:rounded-bl-lg md:rounded-br-lg">
    <form class="flex items-center gap-3" @submit.prevent="sendMessage">
      <input
        class="w-full bg-neutral-900 text-neutral-100 p-3 rounded-lg"
        type="text"
        placeholder="Type a message..."
        :maxlength="maxlength"
        :value="props.modelValue"
        @input="emits('update:modelValue', $event.target.value.trim())"
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
