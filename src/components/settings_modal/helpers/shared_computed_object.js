const SharedComputedObject = () => ({
  user () {
    return this.$store.state.users.currentUser
  },
  expertLevel () {
    return this.$store.getters.mergedConfig.expertLevel > 0
  }
})

export default SharedComputedObject
