import ListsCard from '../lists_card/lists_card.vue'
import ListsNew from '../lists_new/lists_new.vue'

const Lists = {
  data () {
    return {
      isNew: false
    }
  },
  components: {
    ListsCard,
    ListsNew
  },
  computed: {
    lists () {
      return this.$store.state.lists.allLists
    }
  },
  methods: {
    cancelNewList () {
      this.isNew = false
    },
    newList () {
      this.isNew = true
    }
  }
}

export default Lists
