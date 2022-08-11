import TimelineMenuContent from '../timeline_menu/timeline_menu_content.vue'
import ListsMenuContent from '../lists_menu/lists_menu_content.vue'
import { mapState, mapGetters } from 'vuex'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUsers,
  faGlobe,
  faBookmark,
  faEnvelope,
  faChevronDown,
  faChevronUp,
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
  faChevronDown,
  faChevronUp,
  faComments,
  faBell,
  faInfoCircle,
  faStream,
  faList
)

export const TIMELINES = {
  home: {
    route: 'friends',
    anonRoute: 'public-timeline',
    icon: 'home',
    label: 'nav.home_timeline',
    criteria: ['!private']
  },
  public: {
    route: 'public-timeline',
    anon: true,
    icon: 'users',
    label: 'nav.public_tl',
    criteria: ['!private']
  },
  twkn: {
    route: 'public-external-timeline',
    anon: true,
    icon: 'globe',
    label: 'nav.twkn',
    criteria: ['!private', 'federating']
  },
  bookmarks: {
    route: 'bookmarks',
    icon: 'bookmark',
    label: 'nav.bookmarks'
  },
  dms: {
    route: 'dms',
    icon: 'envelope',
    label: 'nav.dms'
  }
}
export const ROOT_ITEMS = {
  interactions: {
    route: 'interactions',
    icon: 'bell',
    label: 'nav.interactions'
  },
  chats: {
    route: 'chats',
    icon: 'comments',
    label: 'nav.chats',
    badgeGetter: 'unreadChatCount'
  },
  friendRequests: {
    route: 'friend-requests',
    icon: 'user-plus',
    label: 'nav.friend_requests',
    criteria: ['lockedUser'],
    badgeGetter: 'followRequestCount'
  },
  about: {
    route: 'about',
    anon: true,
    icon: 'info-circle',
    label: 'nav.about'
  }
}

const NavPanel = {
  created () {
    if (this.currentUser && this.currentUser.locked) {
      this.$store.dispatch('startFetchingFollowRequests')
    }
  },
  components: {
    TimelineMenuContent,
    ListsMenuContent
  },
  data () {
    return {
      showTimelines: false,
      showLists: false,
      timelinesList: Object.entries(TIMELINES).map(([k, v]) => ({ ...v, name: k })),
      rootList: Object.entries(ROOT_ITEMS).map(([k, v]) => ({ ...v, name: k }))
    }
  },
  methods: {
    toggleTimelines () {
      this.showTimelines = !this.showTimelines
    },
    toggleLists () {
      this.showLists = !this.showLists
    },
    toggleCollapse () {
      this.$store.commit('setPreference', { path: 'simple.collapseNav', value: !this.collapsed })
      this.$store.dispatch('pushServerSideStorage')
    },
    isPinned (item) {
      return this.pinnedItems.has(item)
    },
    togglePin (item) {
      if (this.isPinned(item)) {
        this.$store.commit('removeCollectionPreference', { path: 'collections.pinnedNavItems', value: item })
      } else {
        this.$store.commit('addCollectionPreference', { path: 'collections.pinnedNavItems', value: item })
      }
      this.$store.dispatch('pushServerSideStorage')
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser,
      followRequestCount: state => state.api.followRequests.length,
      privateMode: state => state.instance.private,
      federating: state => state.instance.federating,
      pleromaChatMessagesAvailable: state => state.instance.pleromaChatMessagesAvailable,
      pinnedItems: state => new Set(state.serverSideStorage.prefsStorage.collections.pinnedNavItems),
      collapsed: state => state.serverSideStorage.prefsStorage.simple.collapseNav
    }),
    rootItems () {
      return Object
        .entries({ ...ROOT_ITEMS })
        .map(([k, v]) => ({ ...v, name: k }))
        .filter(({ criteria, anon, anonRoute }) => {
          const set = new Set(criteria || [])
          if (!this.federating && set.has('federating')) return false
          if (this.private && set.has('!private')) return false
          if (!this.currentUser && !(anon || anonRoute)) return false
          if ((!this.currentUser || !this.currentUser.locked) && set.has('lockedUser')) return false
          return true
        })
    },
    pinnedList () {
      return Object
        .entries({ ...TIMELINES, ...ROOT_ITEMS })
        .filter(([k]) => this.pinnedItems.has(k))
        .map(([k, v]) => ({ ...v, name: k }))
        .filter(({ criteria, anon, anonRoute }) => {
          const set = new Set(criteria || [])
          if (!this.federating && set.has('federating')) return false
          if (this.private && set.has('!private')) return false
          if (!this.currentUser && !(anon || anonRoute)) return false
          if (this.currentUser && !this.currentUser.locked && set.has('locked')) return false
          return true
        })
    },
    ...mapGetters(['unreadChatCount'])
  }
}

export default NavPanel
