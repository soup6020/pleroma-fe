import { defineAsyncComponent } from 'vue'

const UserPopover = {
  name: 'UserPopover',
  props: [
    'userId', 'overlayCenters', 'disabled'
  ],
  components: {
    UserCard: defineAsyncComponent(() => import('../user_card/user_card.vue')),
    Popover: defineAsyncComponent(() => import('../popover/popover.vue'))
  }
}

export default UserPopover
