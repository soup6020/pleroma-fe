import Popover from '../popover/popover.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons'
import { trim } from 'lodash'

library.add(
  faPlus,
  faTimes,
  faSmileBeam
)

const ReactButton = {
  props: ['status'],
  data () {
    return {
      filterWord: '',
      expanded: false
    }
  },
  components: {
    Popover
  },
  methods: {
    addReaction (event, emoji, close) {
      const existingReaction = this.status.emoji_reactions.find(r => r.name === emoji)
      if (existingReaction && existingReaction.me) {
        this.$store.dispatch('unreactWithEmoji', { id: this.status.id, emoji })
      } else {
        this.$store.dispatch('reactWithEmoji', { id: this.status.id, emoji })
      }
      close()
    },
    onShow () {
      this.expanded = true
      this.focusInput()
    },
    onClose () {
      this.expanded = false
    },
    focusInput () {
      this.$nextTick(() => {
        const input = this.$el.querySelector('input')
        if (input) input.focus()
      })
    }
  },
  computed: {
    commonEmojis () {
      return [
        { displayText: 'thumbsup', replacement: '👍' },
        { displayText: 'angry', replacement: '😠' },
        { displayText: 'eyes', replacement: '👀' },
        { displayText: 'joy', replacement: '😂' },
        { displayText: 'fire', replacement: '🔥' }
      ]
    },
    emojis () {
      if (this.filterWord !== '') {
        const filterWordLowercase = trim(this.filterWord.toLowerCase())
        const orderedEmojiList = []
        for (const emoji of this.$store.getters.standardEmojiList) {
          if (emoji.replacement === this.filterWord) return [emoji]

          const indexOfFilterWord = emoji.displayText.toLowerCase().indexOf(filterWordLowercase)
          if (indexOfFilterWord > -1) {
            if (!Array.isArray(orderedEmojiList[indexOfFilterWord])) {
              orderedEmojiList[indexOfFilterWord] = []
            }
            orderedEmojiList[indexOfFilterWord].push(emoji)
          }
        }
        return orderedEmojiList.flat()
      }
      return this.$store.getters.standardEmojiList || []
    },
    mergedConfig () {
      return this.$store.getters.mergedConfig
    }
  }
}

export default ReactButton
