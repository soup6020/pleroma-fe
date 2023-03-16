import Checkbox from 'src/components/checkbox/checkbox.vue'
import Setting from './setting.js'

export default {
  ...Setting,
  components: {
    ...Setting.components,
    Checkbox
  },
  methods: {
    ...Setting.methods,
    getValue (e) {
      return e
    }
  }
}
