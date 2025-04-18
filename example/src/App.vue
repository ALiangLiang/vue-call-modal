<template>
  <div class="vcm-example">
    <div class="vcm-row">
      <button class="vcm-button" @click="() => openBaseModal()">
        Open Base Modal
      </button>
    </div>

    <div class="vcm-row">
      <input type="text" placeholder="Enter your name" v-model="title" />
      <button class="vcm-button" @click="onClickPropsModalButton">
        Open Modal with Props
      </button>
    </div>

    <div class="vcm-row">
      <button class="vcm-button" @click="onClickFormModalButton">
        Open Form Modal
      </button>
    </div>

    <div class="vcm-row">
      <button class="vcm-button" @click="onClickNonKeepAliveFormModalButton">
        Open Form Modal without KeepAlive
      </button>
    </div>

    <div class="vcm-row">
      <button class="vcm-button" @click="onClickCustomVantDialogButton">
        Open Custom Vant Dialog
      </button>
    </div>

    <div class="vcm-row">
      <button class="vcm-button" @click="onClickPluginModalButton">
        Open Modal with Pinia plugin
      </button>
      <span>Value in Pinia: {{ mainStore.count }}</span>
    </div>

    <div class="vcm-row">
      <button class="vcm-button" @click="openModalOneByOne">
        Open Modals One by One
      </button>
    </div>

    <div>
      Output:
      <br />
      <span style="white-space: pre-line">{{ outputText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { openBaseModal, openFormModal, openNonKeepAliveFormModal, openPropsModal, openCustomVantDialog, openPluginModal } from './components'
import { useMainStore } from './stores/main'

const mainStore = useMainStore()

const outputText = ref('')
const title = ref('Modal with Title prop')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function output(content: any) {
  outputText.value += JSON.stringify(content) + '\n'
  console.log(content)
}

const onClickPropsModalButton = () =>
  openPropsModal({
    title: title.value,
  })
const onClickFormModalButton = async () => {
  try {
    const name = await openFormModal()
    output(name)
  } catch {
    output('Form was cancelled')
  }
}
const onClickNonKeepAliveFormModalButton = async () => {
  try {
    const name = await openNonKeepAliveFormModal()
    output(name)
  } catch {
    output('Form was cancelled')
  }
}
const onClickCustomVantDialogButton = async () => {
  const isConfirmed = await openCustomVantDialog({
    title: 'Custom Vant Dialog',
    image: 'https://img.yzcdn.cn/vant/cat.jpeg',
  })
  output(isConfirmed)
}
const onClickPluginModalButton = async () => {
  const isConfirmed = await openPluginModal()
  output(isConfirmed)
}
const openModalOneByOne = async () => {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        openPropsModal({
          title: `Modal with Title prop ${i + 1}`
        }).then(resolve)
      }, 100)
    })
  }
}
</script>

<style scoped>
.vcm-example {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.vcm-row {
  display: flex;
  gap: 16px;
  align-items: center;
}

.vcm-button {
  background-color: #379c80;
  color: #fff;
  border-radius: 8px;
  border-color: #379c80;
  padding: 8px 16px;
}
</style>
