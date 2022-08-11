import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUsers,
  faGlobe,
  faBookmark,
  faEnvelope,
  faHome
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUsers,
  faGlobe,
  faBookmark,
  faEnvelope,
  faHome
)

const TimelineMenuContent = {
  props: ['content'],
  methods: {
    isPinned (item) {
      return this.pinnedItems.has(item)
    },
    togglePin (item) {
      if (this.isPinned(item)) {
        this.$store.commit('removeCollectionPreference', { path: 'collections.pinnedNavItems', value: item })
      } else {
        this.$store.commit('addCollectionPreference', { path: 'collections.pinnedNavItems', value: item })
      }
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser,
      privateMode: state => state.instance.private,
      federating: state => state.instance.federating,
      pinnedItems: state => new Set(state.serverSideStorage.prefsStorage.collections.pinnedNavItems)
    }),
    list () {
      return (this.content || []).filter(({ criteria, anon, anonRoute }) => {
        const set = new Set(criteria || [])
        if (!this.federating && set.has('federating')) return false
        if (this.private && set.has('!private')) return false
        if (!this.currentUser && !(anon || anonRoute)) return false
        return true
      })
    }
  }
}

export default TimelineMenuContent
