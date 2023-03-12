import Select from 'src/components/select/select.vue'
import ModifiedIndicator from './modified_indicator.vue'
import ProfileSettingIndicator from './profile_setting_indicator.vue'
import Setting from './setting.js'

export default {
  components: {
    Select,
    ModifiedIndicator,
    ProfileSettingIndicator
  },
  ...Setting,
  props: {
    ...Setting.props,
    options: {
      type: Array,
      required: true
    }
  }
}
