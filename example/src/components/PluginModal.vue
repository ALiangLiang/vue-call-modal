<template>
  <dialog ref="dialogRef">
    {{ mainStore.count }}
    <button @click="() => mainStore.plusOne()">+1</button>
    <button @click="() => mainStore.minusOne()">-1</button>
    <button @click="() => (show = false)">Close</button>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { useMainStore } from '../stores/main'

const show = defineModel<boolean>('show')

const mainStore = useMainStore()

const dialogRef = ref<HTMLDialogElement | null>(null)

watch(show, (newValue) => {
  if (!dialogRef.value) return

  if (newValue) {
    dialogRef.value.showModal()
  } else {
    dialogRef.value.close()
  }
})
</script>
