import { mapState } from 'vuex'
import NavigationEntry from 'src/components/navigation/navigation_entry.vue'

export const getListEntries = state => state.lists.allLists.map(list => ({
  name: 'list-' + list.id,
  routeObject: { name: 'lists-timeline', params: { id: list.id } },
  labelRaw: list.title,
  iconLetter: list.title[0]
}))

export const ListsMenuContent = {
  props: [
    'showPin'
  ],
  created () {
    this.$store.dispatch('startFetchingLists')
  },
  components: {
    NavigationEntry
  },
  computed: {
    ...mapState({
      lists: getListEntries,
      currentUser: state => state.users.currentUser,
      privateMode: state => state.instance.private,
      federating: state => state.instance.federating
    })
  }
}

export default ListsMenuContent
