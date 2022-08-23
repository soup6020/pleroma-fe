<template>
  <span class="NavigationPins">
    <router-link
      v-for="item in pinnedList"
      :key="item.name"
      class="pinned-item"
      :to="getRouteTo(item)"
    >
      <FAIcon
        v-if="item.icon"
        fixed-width
        :icon="item.icon"
      />
      <span
        v-if="item.iconLetter"
        class="iconLetter fa-scale-110 fa-old-padding"
      >{{ item.iconLetter }}</span>
      <div
        v-if="item.badgeGetter && getters[item.badgeGetter]"
        class="alert-dot"
      />
    </router-link>
  </span>
</template>

<script src="./navigation_pins.js"></script>

<style lang="scss">
@import '../../_variables.scss';
.NavigationPins {
  display: flex;
  overflow: hidden;
  height: 100%;

  .alert-dot {
    border-radius: 100%;
    height: 0.5em;
    width: 0.5em;
    position: absolute;
    right: calc(50% - 0.25em);
    top: calc(50% - 0.25em);
    margin-left: 6px;
    margin-top: -6px;
    background-color: $fallback--cRed;
    background-color: var(--badgeNotification, $fallback--cRed);
  }

  .pinned-item {
    position: relative;
    flex: 0 0 3em;
    min-width: 2em;
    text-align: center;
    overflow: visible;

    & .svg-inline--fa,
    & .iconLetter {
      margin: 0;
    }

    &.router-link-active {
      color: $fallback--text;
      color: var(--selectedMenuText, $fallback--text);
      border-bottom: 4px solid;

      & .svg-inline--fa,
      & .iconLetter {
        color: inherit;
      }
    }
  }
}
</style>
