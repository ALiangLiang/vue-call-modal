<template>
  <dialog ref="dialogRef">
    <p>{{ title }}</p>
    <button @click="onClickClose">Close</button>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const show = defineModel<boolean>('show')
defineProps<{
  title: string
}>()
const emit = defineEmits<{
  (e: 'resolve'): void
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

watch(show, (newValue) => {
  if (!dialogRef.value) return

  if (newValue) {
    dialogRef.value.showModal()
  } else {
    dialogRef.value.close()
  }
})

const onClickClose = () => {
  show.value = false
  emit('resolve')
}
</script>
