import { mapState } from 'vuex'
import AnnouncementEditor from '../announcement_editor/announcement_editor.vue'
import localeService from '../../services/locale/locale.service.js'

const Announcement = {
  components: {
    AnnouncementEditor
  },
  data () {
    return {
      editing: false,
      newAnnouncement: {
        content: '',
        startsAt: undefined,
        endsAt: undefined
      }
    }
  },
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
    },
    startsAt () {
      const time = this.announcement['starts_at']
      if (!time) {
        return
      }

      return this.formatTimeOrDate(time, localeService.internalToBrowserLocale(this.$i18n.locale))
    },
    endsAt () {
      const time = this.announcement['ends_at']
      if (!time) {
        return
      }

      return this.formatTimeOrDate(time, localeService.internalToBrowserLocale(this.$i18n.locale))
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
    },
    formatTimeOrDate (time, locale) {
      const d = new Date(time)
      return this.announcement['all_day'] ? d.toLocaleDateString(locale) : d.toLocaleString(locale)
    }
  }
}

export default Announcement
