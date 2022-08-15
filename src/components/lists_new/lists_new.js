import { mapState, mapGetters } from 'vuex'
import BasicUserCard from '../basic_user_card/basic_user_card.vue'
import UserAvatar from '../user_avatar/user_avatar.vue'
import ListsUserSearch from '../lists_user_search/lists_user_search.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faSearch,
  faChevronLeft
)

const ListsNew = {
  components: {
    BasicUserCard,
    UserAvatar,
    ListsUserSearch
  },
  data () {
    return {
      title: '',
      userIds: [],
      selectedUserIds: []
    }
  },
  computed: {
    users () {
      return this.userIds.map(userId => this.findUser(userId))
    },
    selectedUsers () {
      return this.selectedUserIds.map(userId => this.findUser(userId))
    },
    ...mapState({
      currentUser: state => state.users.currentUser
    }),
    ...mapGetters(['findUser'])
  },
  methods: {
    goBack () {
      this.$emit('cancel')
    },
    onInput () {
      this.search(this.query)
    },
    selectUser (user) {
      if (this.selectedUserIds.includes(user.id)) {
        this.removeUser(user.id)
      } else {
        this.addUser(user)
      }
    },
    isSelected (user) {
      return this.selectedUserIds.includes(user.id)
    },
    addUser (user) {
      this.selectedUserIds.push(user.id)
    },
    removeUser (userId) {
      this.selectedUserIds = this.selectedUserIds.filter(id => id !== userId)
    },
    onResults (results) {
      this.userIds = results
    },
    createList () {
      // the API has two different endpoints for "creating a list with a name"
      // and "updating the accounts on the list".
      this.$store.dispatch('createList', { title: this.title })
        .then((list) => {
          this.$store.dispatch('setListAccounts', { listId: list.id, accountIds: this.selectedUserIds })
          this.$router.push({ name: 'lists-timeline', params: { listId: list.id } })
        })
    }
  }
}

export default ListsNew
