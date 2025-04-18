
<template>
  <dialog ref="dialogRef">
    <input type="text" placeholder="Enter your name" v-model="name" />
    <button data-close-modal class="btn" @click="onClickCancel">Cancel</button>
    <button data-close-modal class="btn" @click="onClickConfirm">Confirm</button>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
  (e: 'resolve', value: string): void
  (e: 'reject'): void
}>()
const show = defineModel<boolean>('show')

const dialogRef = ref<HTMLDialogElement | null>(null)
const name = ref('')

const onClickConfirm = () => {
  emit('resolve', name.value)
  show.value = false
}
const onClickCancel = () => {
  emit('reject')
  show.value = false
}

watch(show, (newValue) => {
  if (!dialogRef.value) return

  if (newValue) {
    dialogRef.value.showModal()
  } else {
    dialogRef.value.close()
  }
})
</script>
