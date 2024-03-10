<script setup>
import ContentWrapper from '@/components/ContentWrapper.vue'
import vMessagesHeader from '@/components/vMessagesHeader.vue'
import InfinityMessages from '@/components/InfinityMessages.vue'
import vInputForm from '@/components/vInputForm.vue'
</script>

<template>
  <content-wrapper>
    <v-messages-header class="mb-5" />
    <infinity-messages />
    <v-input-form class="mt-5" />
  </content-wrapper>
</template>
