<template>
  <div
    class="screen-reader-text"
    :aria-live="ariaLive"
  >
    {{ currentText }}
  </div>
</template>

<script src="./screen_reader_notice.js"></script>

<style lang="scss">
@import "../../mixins";

.screen-reader-text {
  @include visible-for-screenreader-only;
}
</style>
