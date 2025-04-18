import { makeComponentFunction } from "../../../src";
import BaseModal from "./BaseModal.vue";
import PropsModal from "./PropsModal.vue";
import FormModal from "./FormModal.vue";
import CustomVantDialog from "./CustomVantDialog.vue";
import PluginModal from "./PluginModal.vue";
import { createPinia } from 'pinia'

const [openBaseModal, unmountBaseModal] = makeComponentFunction(BaseModal)
const [openPropsModal, unmountPropsModal] = makeComponentFunction(PropsModal)
const [openFormModal, unmountFormModal] = makeComponentFunction(FormModal)
const [openNonKeepAliveFormModal, unmountNonKeepAliveFormModal] = makeComponentFunction(FormModal, { keepAlive: false })
const [openCustomVantDialog, unmountCustomVantDialog] = makeComponentFunction(CustomVantDialog)
const [openPluginModal, unmountPluginModal] = makeComponentFunction(PluginModal, {
  plugins: [createPinia()],
})

export {
  openBaseModal,
  openPropsModal,
  openFormModal,
  openNonKeepAliveFormModal,
  openCustomVantDialog,
  openPluginModal,
}

if (import.meta.hot) {
  import.meta.hot.dispose(unmountBaseModal)
  import.meta.hot.dispose(unmountPropsModal)
  import.meta.hot.dispose(unmountFormModal)
  import.meta.hot.dispose(unmountNonKeepAliveFormModal)
  import.meta.hot.dispose(unmountCustomVantDialog)
  import.meta.hot.dispose(unmountPluginModal)
}
