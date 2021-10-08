import { defineAsyncComponent } from 'vue'
import Checkbox from '../checkbox/checkbox.vue'
import lozad from 'lozad'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBoxOpen,
  faStickyNote,
  faSmileBeam
} from '@fortawesome/free-solid-svg-icons'
import { trim } from 'lodash'

library.add(
  faBoxOpen,
  faStickyNote,
  faSmileBeam
)

// At widest, approximately 20 emoji are visible in a row,
// loading 3 rows, could be overkill for narrow picker
const LOAD_EMOJI_BY = 60

// When to start loading new batch emoji, in pixels
const LOAD_EMOJI_MARGIN = 64

const filterByKeyword = (list, keyword = '') => {
  if (keyword === '') return list

  const keywordLowercase = keyword.toLowerCase()
  const orderedEmojiList = []
  for (const emoji of list) {
    const indexOfKeyword = emoji.displayText.toLowerCase().indexOf(keywordLowercase)
    if (indexOfKeyword > -1) {
      if (!Array.isArray(orderedEmojiList[indexOfKeyword])) {
        orderedEmojiList[indexOfKeyword] = []
      }
      orderedEmojiList[indexOfKeyword].push(emoji)
    }
  }
  return orderedEmojiList.flat()
}

const EmojiPicker = {
  props: {
    enableStickerPicker: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      keyword: '',
      activeGroup: 'custom',
      showingStickers: false,
      groupsScrolledClass: 'scrolled-top',
      keepOpen: false,
      customEmojiTimeout: null,
      customEmojiLoadAllConfirmed: false,
      groupLoadedCount: {},
      firstLoaded: false
    }
  },
  components: {
    StickerPicker: defineAsyncComponent(() => import('../sticker_picker/sticker_picker.vue')),
    Checkbox
  },
  methods: {
    onStickerUploaded (e) {
      this.$emit('sticker-uploaded', e)
    },
    onStickerUploadFailed (e) {
      this.$emit('sticker-upload-failed', e)
    },
    onEmoji (emoji) {
      const value = emoji.imageUrl ? `:${emoji.displayText}:` : emoji.replacement
      this.$emit('emoji', { insertion: value, keepOpen: this.keepOpen })
    },
    onScroll (e) {
      const target = (e && e.target) || this.$refs['emoji-groups']
      this.updateScrolledClass(target)
    },
    highlight (key) {
      const ref = this.$refs['group-' + key]
      const top = ref.offsetTop
      this.setShowStickers(false)
      this.activeGroup = key
      this.$nextTick(() => {
        this.$refs['emoji-groups'].scrollTop = top + 1
      })
    },
    updateScrolledClass (target) {
      if (target.scrollTop <= 5) {
        this.groupsScrolledClass = 'scrolled-top'
      } else if (target.scrollTop >= target.scrollTopMax - 5) {
        this.groupsScrolledClass = 'scrolled-bottom'
      } else {
        this.groupsScrolledClass = 'scrolled-middle'
      }
    },
    toggleStickers () {
      this.showingStickers = !this.showingStickers
    },
    setShowStickers (value) {
      this.showingStickers = value
    },
    filterByKeyword (list, keyword) {
      return filterByKeyword(list, keyword)
    },
    initializeLazyLoad () {
      this.destroyLazyLoad()
      this.$lozad = lozad('img', {})
      this.$lozad.observe()
    },
    destroyLazyLoad () {
      if (this.$lozad) {
        if (this.$lozad.observer) {
          this.$lozad.observer.disconnect()
        }
        if (this.$lozad.mutationObserver) {
          this.$lozad.mutationObserver.disconnect()
        }
      }
    }
  },
  watch: {
    keyword () {
      this.customEmojiLoadAllConfirmed = false
      this.onScroll()
      // Wait for the dom to change
      this.$nextTick(() => this.initializeLazyLoad())
    },
    allCustomGroups () {
      this.$nextTick(() => this.initializeLazyLoad())
    }
  },
  mounted () {
    this.initializeLazyLoad()
  },
  destroyed () {
    this.destroyLazyLoad()
  },
  computed: {
    activeGroupView () {
      return this.showingStickers ? '' : this.activeGroup
    },
    stickersAvailable () {
      if (this.$store.state.instance.stickers) {
        return this.$store.state.instance.stickers.length > 0
      }
      return 0
    },
    allCustomGroups () {
      return this.$store.getters.groupedCustomEmojis
    },
    allEmojiGroups () {
      const standardEmojis = this.$store.state.instance.emoji || []
      return Object.entries(this.allCustomGroups)
        .map(([_, v]) => v)
        .concat({
          id: 'standard',
          text: this.$t('emoji.unicode'),
          icon: 'box-open',
          emojis: filterByKeyword(standardEmojis, this.keyword)
        })
    },
    filteredEmojiGroups () {
      return this.allEmojiGroups
        .map(group => ({
          ...group,
          emojis: filterByKeyword(group.emojis, this.keyword)
        }))
        .filter(group => group.emojis.length > 0)
    },
    stickerPickerEnabled () {
      return (this.$store.state.instance.stickers || []).length !== 0
    }
  }
}

export default EmojiPicker
