import UserCard from '../user_card/user_card.vue'
import { defineAsyncComponent } from 'vue'

const UserPopover = {
  name: 'UserPopover',
  props: [
    'userId', 'overlayCenters', 'disabled', 'overlayCentersSelector'
  ],
  components: {
    UserCard,
    Popover: defineAsyncComponent(() => import('../popover/popover.vue'))
  },
  computed: {
    userPopoverZoom () {
      return this.$store.getters.mergedConfig.userPopoverZoom
    },
    userPopoverOverlay () {
      return this.$store.getters.mergedConfig.userPopoverOverlay
    }
  }
}

export default UserPopover
