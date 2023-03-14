import { get, set } from 'lodash'
export default {
  props: {
    path: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    parentPath: {
      type: String
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
          return (k, v) => console.log(this.path, k, v)
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
          return false
        case 'admin':
          console.log(this.$store.state.adminSettings.modifiedPaths)
          return this.$store.state.adminSettings.modifiedPaths.has(this.path)
        default:
          return this.state !== this.defaultState
      }
    },
    matchesExpertLevel () {
      return (this.expert || 0) <= this.$store.state.config.expertLevel > 0
    }
  },
  methods: {
    update (e) {
      console.log('U', this.path, e)
      this.configSink(this.path, e)
    },
    reset () {
      set(this.$store.getters.mergedConfig, this.path, this.defaultState)
    }
  }
}
