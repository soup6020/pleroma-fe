import Modal from 'src/components/modal/modal.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import pleromaTan from 'src/assets/pleromatan_apology.png'
import pleromaTanFox from 'src/assets/pleromatan_apology_fox.png'

import {
  faTimes
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faTimes
)

export const CURRENT_UPDATE_COUNTER = 1

const UpdateNotification = {
  data () {
    return {
      pleromaTanVariant: Math.random() > 0.5 ? pleromaTan : pleromaTanFox,
      showingMore: false,
      contentHeight: 0
    }
  },
  components: {
    Modal
  },
  computed: {
    pleromaTanStyles () {
      return {
        'shape-outside': 'url(' + this.pleromaTanVariant + ')'
      }
    },
    shouldShow () {
      return !this.$store.state.instance.disableUpdateNotification &&
        this.$store.state.users.currentUser &&
        this.$store.state.serverSideStorage.flagStorage.updateCounter < CURRENT_UPDATE_COUNTER &&
        !this.$store.state.serverSideStorage.flagStorage.dontShowUpdateNotifs
    }
  },
  methods: {
    toggleShow () {
      this.showingMore = !this.showingMore
    },
    neverShowAgain () {
      this.toggleShow()
      this.$store.commit('setFlag', { flag: 'updateCounter', value: CURRENT_UPDATE_COUNTER })
      this.$store.commit('setFlag', { flag: 'dontShowUpdateNotifs', value: 1 })
      this.$store.dispatch('pushServerSideStorage')
    },
    dismiss () {
      this.$store.commit('setFlag', { flag: 'updateCounter', value: CURRENT_UPDATE_COUNTER })
      this.$store.dispatch('pushServerSideStorage')
    }
  },
  mounted () {
    setTimeout(() => {
      this.contentHeight = this.$refs.content.offsetHeight
    }, 10)
  }
}

export default UpdateNotification
