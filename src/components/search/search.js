import FollowCard from '../follow_card/follow_card.vue'
import Conversation from '../conversation/conversation.vue'
import Status from '../status/status.vue'
import map from 'lodash/map'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCircleNotch,
  faSearch
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCircleNotch,
  faSearch
)

const Search = {
  components: {
    FollowCard,
    Conversation,
    Status
  },
  props: [
    'query'
  ],
  data () {
    return {
      loaded: false,
      loading: false,
      searchTerm: this.query || '',
      userIds: [],
      statuses: [],
      hashtags: [],
      currenResultTab: 'statuses',

      statusesOffset: 0,
      lastStatusFetchCount: 0,
      lastQuery: ''
    }
  },
  computed: {
    users () {
      return this.userIds.map(userId => this.$store.getters.findUser(userId))
    },
    visibleStatuses () {
      const allStatusesObject = this.$store.state.statuses.allStatusesObject

      return this.statuses.filter(status =>
        allStatusesObject[status.id] && !allStatusesObject[status.id].deleted
      )
    }
  },
  mounted () {
    this.search(this.query)
  },
  watch: {
    query (newValue) {
      this.searchTerm = newValue
      this.search(newValue)
    }
  },
  methods: {
    newQuery (query) {
      this.$router.push({ name: 'search', query: { query } })
      this.$refs.searchInput.focus()
    },
    search (query) {
      if (!query) {
        this.loading = false
        return
      }

      this.loading = true
      this.userIds = []
      this.hashtags = []
      this.$refs.searchInput.blur()
      if (this.lastQuery !== query) {
        this.statuses = []
        this.statusesOffset = 0
        this.lastStatusFetchCount = 0
      }

      this.$store.dispatch('search', { q: query, resolve: true, offset: this.statusesOffset })
        .then(data => {
          this.loading = false
          this.userIds = map(data.accounts, 'id')
          this.statuses = this.statuses.concat(data.statuses)
          this.hashtags = data.hashtags
          this.currenResultTab = this.getActiveTab()
          this.loaded = true

          this.statusesOffset += data.statuses.length
          this.lastStatusFetchCount = data.statuses.length
          this.lastQuery = query
        })
    },
    resultCount (tabName) {
      const length = this[tabName].length
      return length === 0 ? '' : ` (${length})`
    },
    onResultTabSwitch (key) {
      this.currenResultTab = key
    },
    getActiveTab () {
      if (this.visibleStatuses.length > 0) {
        return 'statuses'
      } else if (this.users.length > 0) {
        return 'people'
      } else if (this.hashtags.length > 0) {
        return 'hashtags'
      }

      return 'statuses'
    },
    lastHistoryRecord (hashtag) {
      return hashtag.history && hashtag.history[0]
    }
  }
}

export default Search
