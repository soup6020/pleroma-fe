
const Announcement = {
  props: {
    announcement: Object
  },
  computed: {
    content () {
      return this.announcement.content
    }
  }
}

export default Announcement
