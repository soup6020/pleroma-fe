
const Announcement = {
  props: {
    announcement: Object
  },
  computed: {
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
    }
  }
}

export default Announcement
