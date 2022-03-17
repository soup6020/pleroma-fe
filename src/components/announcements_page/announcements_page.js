import Announcement from '../announcement/announcement.vue'

const AnnouncementsPage = {
  components: {
    Announcement
  },
  mounted () {
    this.$store.dispatch('fetchAnnouncements')
  },
  computed: {
    announcements () {
      return this.$store.state.announcements.announcements
    }
  }
}

export default AnnouncementsPage
