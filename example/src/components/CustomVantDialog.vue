<template>
  <div class="custom-vant-dialog">
    <van-dialog
      v-bind="Object.assign({}, $attrs, $props)"
      v-model:show="show"
      show-cancel-button
      @confirm="() => emit('resolve', true)"
      @cancel="() => emit('resolve', false)"
    >
      <van-image
        v-if="image"
        :src="image"
        fit="cover"
        width="100%"
        height="200px"
        style="border-radius: 10px 10px 0 0"
      />
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import { Dialog as VanDialog, Image as VanImage, dialogProps } from 'vant'

const show = defineModel<boolean>('show')
const emit = defineEmits<{
  (e: 'resolve', value: boolean): void
}>()
const props = defineProps({
  ...dialogProps,
  image: {
    type: String,
    default: '',
  },
})
console.log(props)
console.log(useAttrs())
</script>

<style scoped>
.custom-vant-dialog {
  --van-dialog-background: #08c384;
  --van-dialog-radius: 10px;
}
</style>
