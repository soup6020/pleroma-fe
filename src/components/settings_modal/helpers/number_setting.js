import { get, set } from 'lodash'
import ModifiedIndicator from './modified_indicator.vue'
export default {
  components: {
    ModifiedIndicator
  },
  props: {
    path: String,
    disabled: Boolean,
    min: Number,
    step: Number,
    truncate: Number,
    expert: [Number, String]
  },
  computed: {
    pathDefault () {
      const [firstSegment, ...rest] = this.path.split('.')
      return [firstSegment + 'DefaultValue', ...rest].join('.')
    },
    parent () {
      return this.$parent.$parent
    },
    state () {
      const value = get(this.parent, this.path)
      if (value === undefined) {
        return this.defaultState
      } else {
        return value
      }
    },
    defaultState () {
      return get(this.parent, this.pathDefault)
    },
    isChanged () {
      return this.state !== this.defaultState
    },
    matchesExpertLevel () {
      return (this.expert || 0) <= this.parent.expertLevel
    }
  },
  methods: {
    truncateValue (value) {
      if (!this.truncate) {
        return value
      }

      return Math.trunc(value / this.truncate) * this.truncate
    },
    update (e) {
      set(this.parent, this.path, this.truncateValue(parseFloat(e.target.value)))
    },
    reset () {
      set(this.parent, this.path, this.defaultState)
    }
  }
}
