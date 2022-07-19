<template>
<Popover
  trigger="click"
  popover-class="popover-default user-popover"
  :overlay-centers-selector="overlayCentersSelector || '.user-info .Avatar'"
  :overlay-centers="overlayCenters && userPopoverOverlay"
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
      :avatar-action="userPopoverZoom ? 'zoom' : close"
      :on-close="close"
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
