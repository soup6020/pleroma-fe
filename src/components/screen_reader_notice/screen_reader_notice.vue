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
.screen-reader-text {
  display: block;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  visibility: visible;
}
</style>
