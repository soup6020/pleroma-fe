<template>
  <div class="announcement">
    <rich-content :html="content" />
  </div>
</template>

<script src="./announcement.js"></script>

<style lang="scss">
@import "../../variables";

.announcement {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--border, $fallback--border);
  border-radius: 0;
  padding: var(--status-margin, $status-margin);
}
</style>
