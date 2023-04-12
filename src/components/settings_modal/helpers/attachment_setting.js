import Setting from './setting.js'
import { fileTypeExt } from 'src/services/file_type/file_type.service.js'
import MediaUpload from 'src/components/media_upload/media_upload.vue'
import Attachment from 'src/components/attachment/attachment.vue'

export default {
  ...Setting,
  props: {
    ...Setting.props,
    type: {
      type: Array,
      required: false,
      default: []
    }
  },
  components: {
    ...Setting.components,
    MediaUpload,
    Attachment
  },
  computed: {
    ...Setting.computed,
    attachment () {
      const path = this.realDraftMode ? this.draft : this.state
      const url = path.includes('://') ? path : this.$store.state.instance.server + path
      return {
        mimetype: fileTypeExt(url),
        url
      }
    }
  },
  methods: {
    ...Setting.methods,
    setMediaFile (fileInfo) {
      if (this.realDraftMode) {
        this.draft = fileInfo.url
      } else {
        this.configSink(this.path, fileInfo.url)
      }
    }
  }
}
