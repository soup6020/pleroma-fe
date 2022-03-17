<template>
  <div class="announcement">
    <div class="heading">
      <h4>{{ $t('announcements.title') }}</h4>
    </div>
    <div class="body">
      <rich-content
        :html="content"
        :emoji="announcement.emojis"
        :handle-links="true"
      />
    </div>
    <div class="footer">
      <button
        class="btn button-default"
        :class="{ toggled: isRead }"
        @click="markAsRead"
      >
        {{ $t('announcements.mark_as_read_action') }}
      </button>
    </div>
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

  .heading, .body {
    margin-bottom: var(--status-margin, $status-margin);
  }
}
</style>
