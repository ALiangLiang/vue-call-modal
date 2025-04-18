
<template>
  <dialog ref="dialogRef">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatum placeat iure quis non facilis veritatis earum reprehenderit accusamus aperiam.</p>
    <button data-close-modal class="btn" @click="() => (show = false)">Confirm</button>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const show = defineModel<boolean>('show')

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
