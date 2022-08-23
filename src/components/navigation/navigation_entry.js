import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'

library.add(faThumbtack)

const USERNAME_ROUTES = new Set([
  'bookmarks',
  'dms',
  'interactions',
  'notifications',
  'chat',
  'chats'
])

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
      this.$store.dispatch('pushServerSideStorage')
    }
  },
  computed: {
    routeTo () {
      if (this.item.routeObject) {
        return this.item.routeObject
      }
      const route = { name: (this.item.anon || this.currentUser) ? this.item.route : this.item.anonRoute }
      if (USERNAME_ROUTES.has(route.name)) {
        route.params = { username: this.currentUser.screen_name }
      }
      return route
    },
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
