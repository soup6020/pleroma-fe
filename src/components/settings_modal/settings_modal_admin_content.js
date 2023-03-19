import TabSwitcher from 'src/components/tab_switcher/tab_switcher.jsx'

import DataImportExportTab from './tabs/data_import_export_tab.vue'
import MutesAndBlocksTab from './tabs/mutes_and_blocks_tab.vue'
import InstanceTab from './admin_tabs/instance_tab.vue'
import LimitsTab from './admin_tabs/limits_tab.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faWrench,
  faUser,
  faFilter,
  faPaintBrush,
  faBell,
  faDownload,
  faEyeSlash,
  faInfo
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faWrench,
  faUser,
  faFilter,
  faPaintBrush,
  faBell,
  faDownload,
  faEyeSlash,
  faInfo
)

const SettingsModalAdminContent = {
  components: {
    TabSwitcher,

    DataImportExportTab,
    MutesAndBlocksTab,
    InstanceTab,
    LimitsTab
  },
  computed: {
    isLoggedIn () {
      return !!this.$store.state.users.currentUser
    },
    open () {
      return this.$store.state.interface.settingsModalState !== 'hidden'
    },
    bodyLock () {
      return this.$store.state.interface.settingsModalState === 'visible'
    }
  },
  methods: {
    onOpen () {
      const targetTab = this.$store.state.interface.settingsModalTargetTab
      // We're being told to open in specific tab
      if (targetTab) {
        const tabIndex = this.$refs.tabSwitcher.$slots.default().findIndex(elm => {
          return elm.props && elm.props['data-tab-name'] === targetTab
        })
        if (tabIndex >= 0) {
          this.$refs.tabSwitcher.setTab(tabIndex)
        }
      }
      // Clear the state of target tab, so that next time settings is opened
      // it doesn't force it.
      this.$store.dispatch('clearSettingsModalTargetTab')
    }
  },
  mounted () {
    this.onOpen()
  },
  watch: {
    open: function (value) {
      if (value) this.onOpen()
    }
  }
}

export default SettingsModalAdminContent
