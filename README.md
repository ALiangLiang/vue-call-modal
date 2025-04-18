# Vue Call Modal

A Vue.js library to easily wrap your modal components and call them with a simple function.

## Features

- Lightweight and easy to use
- Fully customizable
- Compatible with Vue 3
- Supports TypeScript

## Installation

```bash
pnpm add vue-call-modal
```

## Usage

### Basic Example

```html
<!-- CustomModal.vue -->
<template>
  <dialog ref="dialogRef">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <button @click="() => (show = false)">Confirm</button>
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
```

```typescript
// modals.ts
import CustomModal from './CustomModal.vue'

export const [openCustomModal] = makeComponentFunction(CustomModal)
```

```html
<!-- App.vue -->
<template>
  <div>
    <button @click="openCustomModal()">Open Modal</button>
  </div>
</template>
<script setup lang="ts">
import { openCustomModal } from './modals'
</script>
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Author

Developed by Aliangliang.