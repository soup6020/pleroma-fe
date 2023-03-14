import Modal from 'src/components/modal/modal.vue'
import PanelLoading from 'src/components/panel_loading/panel_loading.vue'
import AsyncComponentError from 'src/components/async_component_error/async_component_error.vue'
import getResettableAsyncComponent from 'src/services/resettable_async_component.js'
import Popover from '../popover/popover.vue'
import Checkbox from 'src/components/checkbox/checkbox.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  newImporter,
  newExporter
} from 'src/services/export_import/export_import.js'
import {
  faTimes,
  faFileUpload,
  faFileDownload,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import {
  faWindowMinimize
} from '@fortawesome/free-regular-svg-icons'

library.add(
  faTimes,
  faWindowMinimize,
  faFileUpload,
  faFileDownload,
  faChevronDown
)

const AdminModal = {
  data () {
    return {}
  },
  components: {
    Modal,
    Popover,
    Checkbox,
    AdminModalContent: getResettableAsyncComponent(
      () => import('./admin_modal_content.vue'),
      {
        loadingComponent: PanelLoading,
        errorComponent: AsyncComponentError,
        delay: 0
      }
    )
  },
  methods: {
    closeModal () {
      this.$store.dispatch('closeAdminModal')
    },
    peekModal () {
      this.$store.dispatch('togglePeekAdminModal')
    }
  },
  computed: {
    modalActivated () {
      return this.$store.state.interface.adminModalState !== 'hidden'
    },
    modalOpenedOnce () {
      return this.$store.state.interface.adminModalLoaded
    },
    modalPeeked () {
      return this.$store.state.interface.adminModalState === 'minimized'
    }
  }
}

export default AdminModal
