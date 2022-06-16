<template>
<Popover
  trigger="click"
  popover-class="popover-default user-popover"
  overlay-centers-selector=".user-info-avatar-link .Avatar"
  :overlay-centers="overlayCenters"
  :disabled="disabled"
>
  <template v-slot:trigger>
    <slot />
  </template>
  <template v-slot:content>
    <UserCard
      class="user-popover"
      :user-id="userId"
      :hide-bio="true"
      :bordered="false"
      :allow-zooming-avatar="true"
      :rounded="true"
    />
  </template>
</Popover>
</template>

<script src="./user_popover.js" ></script>

<style lang="scss">
@import '../../_variables.scss';

/* popover styles load on-demand, so we need to override */
.user-popover.popover {
}

</style>
