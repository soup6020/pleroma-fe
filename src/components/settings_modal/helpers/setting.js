import Checkbox from 'src/components/checkbox/checkbox.vue'
import ModifiedIndicator from './modified_indicator.vue'
import ProfileSettingIndicator from './profile_setting_indicator.vue'
import DraftButtons from './draft_buttons.vue'
import { get, set } from 'lodash'

export default {
  components: {
    Checkbox,
    ModifiedIndicator,
    DraftButtons,
    ProfileSettingIndicator
  },
  props: {
    path: {
      type: [String, Array],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    parentPath: {
      type: [String, Array]
    },
    parentInvert: {
      type: Boolean,
      default: false
    },
    expert: {
      type: [Number, String],
      default: 0
    },
    source: {
      type: String,
      default: 'default'
    },
    draftMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      draft: null
    }
  },
  created () {
    if (this.draftMode) {
      this.draft = this.state
    }
  },
  computed: {
    state () {
      const value = get(this.configSource, this.path)
      if (value === undefined) {
        return this.defaultState
      } else {
        return value
      }
    },
    backendDescription () {
      return get(this.$store.state.adminSettings.descriptions, this.path)
    },
    backendDescriptionLabel () {
      return this.backendDescription?.label
    },
    backendDescriptionDescription () {
      return this.backendDescription?.description
    },
    backendDescriptionSuggestions () {
      return this.backendDescription?.suggestions
    },
    shouldBeDisabled () {
      const parentValue = this.parentPath !== undefined ? get(this.configSource, this.parentPath) : null
      return this.disabled || (parentValue !== null ? (this.parentInvert ? parentValue : !parentValue) : false)
    },
    configSource () {
      switch (this.source) {
        case 'profile':
          return this.$store.state.profileConfig
        case 'admin':
          return this.$store.state.adminSettings.config
        default:
          return this.$store.getters.mergedConfig
      }
    },
    configSink () {
      switch (this.source) {
        case 'profile':
          return (k, v) => this.$store.dispatch('setProfileOption', { name: k, value: v })
        case 'admin':
          return (k, v) => this.$store.dispatch('pushAdminSetting', { path: k, value: v })
        default:
          return (k, v) => this.$store.dispatch('setOption', { name: k, value: v })
      }
    },
    defaultState () {
      switch (this.source) {
        case 'profile':
          return {}
        default:
          return get(this.$store.getters.defaultConfig, this.path)
      }
    },
    isProfileSetting () {
      return this.source === 'profile'
    },
    isChanged () {
      switch (this.source) {
        case 'profile':
        case 'admin':
          return false
        default:
          return this.state !== this.defaultState
      }
    },
    isDirty () {
      return this.draftMode && this.draft !== this.state
    },
    canHardReset () {
      return this.source === 'admin' && this.$store.state.adminSettings.modifiedPaths.has(this.path)
    },
    matchesExpertLevel () {
      return (this.expert || 0) <= this.$store.state.config.expertLevel > 0
    }
  },
  methods: {
    getValue (e) {
      return e.target.value
    },
    update (e) {
      if (this.draftMode) {
        this.draft = this.getValue(e)
      } else {
        this.configSink(this.path, this.getValue(e))
      }
    },
    commitDraft () {
      if (this.draftMode) {
        this.configSink(this.path, this.draft)
      }
    },
    reset () {
      console.log('reset')
      if (this.draftMode) {
        console.log(this.draft)
        console.log(this.state)
        this.draft = this.state
      } else {
        set(this.$store.getters.mergedConfig, this.path, this.defaultState)
      }
    },
    hardReset () {
      switch (this.source) {
        case 'admin':
          return this.$store.dispatch('resetAdminSetting', { path: this.path })
            .then(() => { this.draft = this.state })
        default:
          console.warn('Hard reset not implemented yet!')
      }
    }
  }
}
