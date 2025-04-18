import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMainStore = defineStore('index', () => {
  const count = ref(0)

  const plusOne = () => {
    count.value++
  }
  const minusOne = () => {
    count.value--
  }

  return {
    count,
    plusOne,
    minusOne,
  }
})
