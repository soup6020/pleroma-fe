import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'

library.add(faThumbtack)

const NavigationEntry = {
  props: ['item', 'showPin'],
  methods: {
    isPinned (value) {
      return this.pinnedItems.has(value)
    },
    togglePin (value) {
      if (this.isPinned(value)) {
        this.$store.commit('removeCollectionPreference', { path: 'collections.pinnedNavItems', value })
      } else {
        this.$store.commit('addCollectionPreference', { path: 'collections.pinnedNavItems', value })
      }
    }
  },
  computed: {
    getters () {
      return this.$store.getters
    },
    ...mapState({
      currentUser: state => state.users.currentUser,
      pinnedItems: state => new Set(state.serverSideStorage.prefsStorage.collections.pinnedNavItems)
    })
  }
}

export default NavigationEntry
