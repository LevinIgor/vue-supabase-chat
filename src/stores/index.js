import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('main', () => {
  const name = ref(0)
  const country = ref('UA')

  function setName(newName) {
    name.value = newName
  }

  function getName() {
    return name.value
  }

  function setCountry(newCountry) {
    country.value = newCountry
  }

  function getCountry() {
    return country.value
  }

  return { setName, getName, setCountry, getCountry }
})
