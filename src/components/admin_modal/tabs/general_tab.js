import BooleanSetting from '../settings_modal/helpers/boolean_setting.vue'
import ChoiceSetting from '../settings_modal/helpers/choice_setting.vue'
import IntegerSetting from '../settings_modal/helpers/integer_setting.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGlobe
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faGlobe
)

const GeneralTab = {
  components: {
    BooleanSetting,
    ChoiceSetting,
    IntegerSetting,
  },
  computed: {
    mergedConfig () {
      console.log(this.$store.state)
      return this.$store.state
    }
  },
  methods: {
    changeDefaultScope (value) {
      this.$store.dispatch('setProfileOption', { name: 'defaultScope', value })
    }
  }
}

export default GeneralTab
