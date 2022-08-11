import { getListEntries } from '../lists_menu/lists_menu_content.vue'
import { mapState } from 'vuex'
import { TIMELINES, ROOT_ITEMS } from 'src/components/navigation/navigation.js'
import { filterNavigation } from 'src/components/navigation/filter.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUsers,
  faGlobe,
  faBookmark,
  faEnvelope,
  faComments,
  faBell,
  faInfoCircle,
  faStream,
  faList
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUsers,
  faGlobe,
  faBookmark,
  faEnvelope,
  faComments,
  faBell,
  faInfoCircle,
  faStream,
  faList
)
const NavPanel = {
  props: ['limit'],
  computed: {
    getters () {
      return this.$store.getters
    },
    ...mapState({
      lists: getListEntries,
      currentUser: state => state.users.currentUser,
      followRequestCount: state => state.api.followRequests.length,
      privateMode: state => state.instance.private,
      federating: state => state.instance.federating,
      pleromaChatMessagesAvailable: state => state.instance.pleromaChatMessagesAvailable,
      pinnedItems: state => new Set(state.serverSideStorage.prefsStorage.collections.pinnedNavItems)
    }),
    pinnedList () {
      if (!this.currentUser) {
        return [
          { ...TIMELINES.public, name: 'public' },
          { ...TIMELINES.twkn, name: 'twkn' },
          { ...ROOT_ITEMS.about, name: 'about' }
        ]
      }
      return filterNavigation(
        [
          ...Object
            .entries({ ...TIMELINES })
            .filter(([k]) => this.pinnedItems.has(k))
            .map(([k, v]) => ({ ...v, name: k })),
          ...this.lists.filter((k) => this.pinnedItems.has(k.name)),
          ...Object
            .entries({ ...ROOT_ITEMS })
            .filter(([k]) => this.pinnedItems.has(k))
            .map(([k, v]) => ({ ...v, name: k }))
        ],
        {
          hasChats: this.pleromaChatMessagesAvailable,
          isFederating: this.federating,
          isPrivate: this.privateMode,
          currentUser: this.currentUser
        }
      ).slice(0, this.limit)
    }
  }
}

export default NavPanel
