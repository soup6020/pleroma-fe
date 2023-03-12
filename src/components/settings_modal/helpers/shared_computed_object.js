import { defaultState as configDefaultState } from 'src/modules/config.js'

const SharedComputedObject = () => ({
  user () {
    return this.$store.state.users.currentUser
  },
  // Generating computed values for vuex properties
  ...Object.keys(configDefaultState)
    .map(key => [key, {
      get () { return this.$store.getters.mergedConfig[key] },
      set (value) {
        this.$store.dispatch('setOption', { name: key, value })
      }
    }])
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
})

export default SharedComputedObject
