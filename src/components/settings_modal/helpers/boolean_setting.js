import Checkbox from 'src/components/checkbox/checkbox.vue'
import ModifiedIndicator from './modified_indicator.vue'
import ProfileSettingIndicator from './profile_setting_indicator.vue'
import Setting from './setting.js'

export default {
  components: {
    Checkbox,
    ModifiedIndicator,
    ProfileSettingIndicator
  },
  ...Setting
}
