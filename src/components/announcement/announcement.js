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
        endsAt: undefined,
        allDay: undefined
      },
      editError: ''
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
    },
    enterEditMode () {
      this.newAnnouncement.content = this.announcement.pleroma['raw_content']
      this.newAnnouncement.startsAt = this.announcement['starts_at']
      this.newAnnouncement.endsAt = this.announcement['ends_at']
      this.newAnnouncement.allDay = this.announcement['all_day']
      this.editing = true
    },
    submitEdit () {
      this.$store.dispatch('editAnnouncement', {
        id: this.announcement.id,
        ...this.newAnnouncement
      })
        .then(() => {
          this.editing = false
        })
        .catch(error => {
          this.editError = error.error
        })
    },
    cancelEdit () {
      this.editing = false
    },
    clearError () {
      this.editError = undefined
    }
  }
}

export default Announcement
