import { mapState } from 'vuex'

const Announcement = {
  props: {
    announcement: Object
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    }),
    content () {
      return this.announcement.content
    },
    isRead () {
      return this.announcement.read
    }
  },
  methods: {
    markAsRead () {
      if (!this.isRead) {
        return this.$store.dispatch('markAnnouncementAsRead', this.announcement.id)
      }
    },
    deleteAnnouncement () {
      return this.$store.dispatch('deleteAnnouncement', this.announcement.id)
    }
  }
}

export default Announcement
