<template>
<Popover
  trigger="click"
  popover-class="popover-default user-popover"
  :overlay-centers-selector="overlayCentersSelector || '.user-info-avatar-link .Avatar'"
  :overlay-centers="overlayCenters"
  :disabled="disabled"
>
  <template v-slot:trigger>
    <slot />
  </template>
  <template v-slot:content={close}>
    <UserCard
      class="user-popover"
      :user-id="userId"
      :hide-bio="true"
      :allow-zooming-avatar="true"
      :onClose="close"
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
