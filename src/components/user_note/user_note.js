const UserNote = {
  props: {
    user: Object,
    relationship: Object
  },
  data () {
    return {
      localNote: '',
      editing: false
    }
  },
  computed: {
    shouldShow () {
      return this.relationship.note || this.editing
    }
  },
  methods: {
    startEditing () {
      this.localNote = this.relationship.note
      this.editing = true
    },
    cancelEditing () {
      this.editing = false
    },
    finalizeEditing () {
      this.editing = false
    }
  }
}

export default UserNote
