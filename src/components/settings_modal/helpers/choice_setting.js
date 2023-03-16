import Select from 'src/components/select/select.vue'
import Setting from './setting.js'

export default {
  ...Setting,
  components: {
    ...Setting.components,
    Select
  },
  props: {
    ...Setting.props,
    options: {
      type: Array,
      required: true
    }
  }
}
