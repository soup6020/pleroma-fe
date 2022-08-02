import UserPopover from '../user_popover/user_popover.vue'
import UserAvatar from '../user_avatar/user_avatar.vue'
import RichContent from 'src/components/rich_content/rich_content.jsx'
import generateProfileLink from 'src/services/user_profile_link_generator/user_profile_link_generator'

const BasicUserCard = {
  props: [
    'user'
  ],
  components: {
    UserPopover,
    UserAvatar,
    RichContent
  },
  methods: {
    userProfileLink (user) {
      return generateProfileLink(user.id, user.screen_name, this.$store.state.instance.restrictedNicknames)
    }
  }
}

export default BasicUserCard
