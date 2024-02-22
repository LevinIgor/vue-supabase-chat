<script setup>
import githubIcon from '@/components/github-icon.vue'
</script>
<template>
  <footer class="flex bg-black-100 w-full border-neutral-700 border-t py-2" id="footer">
    <a
      class="mx-auto flex items-center gap-5 hover:text-slate-50 cursor-pointer transition-colors"
      href="https://github.com/LevinIgor/vue-supabase-chat"
      target="_blank"
    >
      <github-icon />
      <span>View source code on Github</span>
    </a>
  </footer>
</template>

<style lang="scss" scoped></style>
