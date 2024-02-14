import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('main', () => {
  const name = ref(0)

  function setName(newName) {
    name.value = newName
  }

  function getName() {
    return name.value
  }

  return { setName, getName }
})
