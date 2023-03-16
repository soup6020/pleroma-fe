import Setting from './setting.js'

export default {
  ...Setting,
  methods: {
    ...Setting.methods,
    getValue (e) {
      return parseInt(e.target.value)
    }
  }
}
