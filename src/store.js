import { ref } from 'vue'
import { defineStore } from 'pinia'
import { insertUser as insertUserAsync } from '@/api'

export default defineStore('main', () => {
  const name = ref(0)
  const user_location = ref('UA')
  const projectStats = ref({})

  function setName(newName) {
    name.value = newName
  }

  function getName() {
    return name.value
  }

  function setUserLocation(data) {
    user_location.value = data
    insertUserAsync(data)
  }

  function getCountry() {
    return user_location.value.country.iso_code
  }

  function getLocation() {
    return user_location.value
  }

  function setProjectStats(stats) {
    projectStats.value = stats
  }

  function getProjectStats() {
    return projectStats.value
  }

  function incrementProjectMessageCount() {
    projectStats.value.message_count++
  }

  return {
    setName,
    getName,
    getCountry,
    setUserLocation,
    getLocation,
    setProjectStats,
    getProjectStats,
    projectStats,
    incrementProjectMessageCount
  }
})
