import { mapState } from 'vuex'
import Announcement from '../announcement/announcement.vue'

const AnnouncementsPage = {
  components: {
    Announcement
  },
  data () {
    return {
      newAnnouncement: {
        content: ''
      },
      posting: false,
      error: undefined
    }
  },
  mounted () {
    this.$store.dispatch('fetchAnnouncements')
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    }),
    announcements () {
      return this.$store.state.announcements.announcements
    }
  },
  methods: {
    postAnnouncement () {
      this.posting = true
      this.$store.dispatch('postAnnouncement', this.newAnnouncement)
        .catch(error => {
          this.error = error.error
        })
        .finally(() => {
          this.posting = false
        })
    },
    clearError () {
      this.error = undefined
    }
  }
}

export default AnnouncementsPage
