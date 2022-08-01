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

const SettingsModal = {
  data () {
    return {
      pleromaTanVariant: Math.random() > 0.5 ? pleromaTan : pleromaTanFox
    }
  },
  components: {
    Modal
  }
}

export default SettingsModal
