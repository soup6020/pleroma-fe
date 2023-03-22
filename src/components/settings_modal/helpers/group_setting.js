import { isEqual } from 'lodash'

import Setting from './setting.js'

export default {
  ...Setting,
  computed: {
    ...Setting.computed,
    isDirty () {
      console.log(this.state, this.draft)
      return !isEqual(this.state, this.draft)
    }
  }
}
