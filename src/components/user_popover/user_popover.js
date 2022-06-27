import UserCard from '../user_card/user_card.vue'
import { defineAsyncComponent } from 'vue'

const UserPopover = {
  name: 'UserPopover',
  props: [
    'userId', 'overlayCenters', 'disabled', 'overlay-centers-selector'
  ],
  components: {
    UserCard,
    Popover: defineAsyncComponent(() => import('../popover/popover.vue'))
  }
}

export default UserPopover
