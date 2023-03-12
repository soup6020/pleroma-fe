import ModifiedIndicator from './modified_indicator.vue'
import Setting from './setting.js'

export default {
  components: {
    ModifiedIndicator
  },
  ...Setting,
  methods: {
    ...Setting.methods,
    update (e) {
      this.configSink(this.path, parseInt(e.target.value))
    }
  }
}
