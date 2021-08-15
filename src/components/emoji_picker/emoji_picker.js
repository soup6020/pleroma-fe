import { defineAsyncComponent } from 'vue'
import Checkbox from '../checkbox/checkbox.vue'
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

const packOf = emoji => (emoji.tags.filter(k => k.startsWith('pack:'))[0] || '').slice(5)

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
      customEmojiBufferSlice: LOAD_EMOJI_BY,
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
      this.scrolledGroup(target)
      this.$nextTick(() => {
        this.triggerLoadMore(target)
      })
    },
    highlight (key) {
      const ref = this.$refs['group-' + key]
      const top = ref.offsetTop
      this.setShowStickers(false)
      this.activeGroup = key
      this.$nextTick(() => {
        this.$refs['emoji-groups'].scrollTop = top + 1
        this.loadEmoji(key)
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
    triggerLoadMore (target) {
      Object.keys(this.allCustomGroups)
        .map(groupId => {
          const ref = this.$refs[`group-end-${groupId}`][0]
          if (!ref) return undefined

          const bottom = ref.offsetTop + ref.offsetHeight

          const group = this.$refs[`group-${groupId}`][0]
          const top = group.offsetTop

          const scrollerBottom = target.scrollTop + target.clientHeight
          const scrollerTop = target.scrollTop
          const scrollerMax = target.scrollHeight

          // Loads more emoji when they come into view
          const approachingBottom = bottom - scrollerBottom < LOAD_EMOJI_MARGIN
          // Always load when at the very top in case there's no scroll space yet
          const atTop = scrollerTop < top + target.clientHeight / 2 && top < scrollerBottom
          // Don't load when looking at unicode category or at the very bottom
          const bottomAboveViewport = bottom < scrollerTop || scrollerBottom === scrollerMax
          if (!bottomAboveViewport && (approachingBottom || atTop)) {
            return groupId
          }
          return undefined
        })
        .filter(k => k)
        .map(k => {
          this.loadEmoji(k)
        })
    },
    scrolledGroup (target) {
      const top = target.scrollTop + 5
      this.$nextTick(() => {
        this.allEmojiGroups.forEach(group => {
          const ref = this.$refs['group-' + group.id]
          if (ref.offsetTop <= top) {
            this.activeGroup = group.id
          }
        })
      })
    },
    loadEmoji (loadGroup) {
      if (!this.allCustomGroups[loadGroup]) {
        return
      }

      const allLoaded = this.loadedCount[loadGroup] >= this.allCustomGroups[loadGroup].emojis.length

      if (allLoaded) {
        return
      }

      this.groupLoadedCount = {
        ...this.groupLoadedCount,
        [loadGroup]: this.loadedCount[loadGroup] + LOAD_EMOJI_BY
      }
    },
    startEmojiLoad (forceUpdate = false) {
      if (!forceUpdate) {
        this.keyword = ''
      }
      this.$nextTick(() => {
        this.$refs['emoji-groups'].scrollTop = 0
        this.$nextTick(() => {
          if (this.firstLoaded) {
            return
          }
          this.triggerLoadMore(this.$refs['emoji-groups'])
          this.firstLoaded = true
        })
      })
      const bufferSize = this.customEmojiBuffer.length
      const bufferPrefilledAll = bufferSize === this.filteredEmoji.length
      if (bufferPrefilledAll && !forceUpdate) {
        return
      }
      this.customEmojiBufferSlice = LOAD_EMOJI_BY
    },
    toggleStickers () {
      this.showingStickers = !this.showingStickers
    },
    setShowStickers (value) {
      this.showingStickers = value
    },
    limitedEmojis (list, groupId) {
      return list.slice(0, this.loadedCount[groupId])
    }
  },
  watch: {
    keyword () {
      this.customEmojiLoadAllConfirmed = false
      this.onScroll()
      this.startEmojiLoad(true)
    }
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
    allEmojis () {
      return this.$store.state.instance.customEmoji || []
    },
    filteredEmoji () {
      return filterByKeyword(
        this.allEmojis,
        trim(this.keyword)
      )
    },
    customEmojiBuffer () {
      return this.filteredEmoji.slice(0, this.customEmojiBufferSlice)
    },
    groupedCustomEmojis () {
      return this.customEmojiBuffer.reduce((res, emoji) => {
        const pack = packOf(emoji)
        if (!res[pack]) {
          res[pack] = {
            id: `custom-${pack}`,
            text: pack,
            /// FIXME
            // icon: 'smile-beam',
            image: emoji.imageUrl,
            emojis: []
          }
        }
        res[pack].emojis.push(emoji)
        return res
      }, {})
    },
    allCustomGroups () {
      return this.filteredEmoji
        .reduce((res, emoji) => {
          const packName = packOf(emoji)
          const packId = `custom-${packName}`
          if (!res[packId]) {
            res[packId] = ({
              id: packId,
              text: packName,
              image: emoji.imageUrl,
              emojis: []
            })
          }
          res[packId].emojis.push(emoji)
          return res
        }, {})
    },
    sensibleInitialAmountForAGroup () {
      const groupCount = Object.keys(this.allCustomGroups).length
      return Math.max(Math.floor(LOAD_EMOJI_BY / Math.max(groupCount, 1)), 1)
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
    emojis () {
      const standardEmojis = this.$store.state.instance.emoji || []
      // const customEmojis = this.customEmojiBuffer

      return [
        ...Object
          .keys(this.groupedCustomEmojis)
          .map(k => this.groupedCustomEmojis[k]),
        {
          id: 'standard',
          text: this.$t('emoji.unicode'),
          icon: 'box-open',
          emojis: filterByKeyword(standardEmojis, trim(this.keyword))
        }
      ]
    },
    loadedCount () {
      return Object.keys(this.allCustomGroups)
        .reduce((res, groupId) => {
          res[groupId] = this.groupLoadedCount[groupId] || this.sensibleInitialAmountForAGroup
          return res
        }, {})
    },
    lastNonUnicodeGroupId () {
      return this.emojis[this.emojis.length - 2].id
    },
    emojisView () {
      return this.emojis.filter(value => value.emojis.length > 0)
    },
    stickerPickerEnabled () {
      return (this.$store.state.instance.stickers || []).length !== 0
    }
  }
}

export default EmojiPicker
