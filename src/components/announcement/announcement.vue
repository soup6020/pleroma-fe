<template>
  <div class="announcement">
    <div class="heading">
      <h4>{{ $t('announcements.title') }}</h4>
    </div>
    <div class="body">
      <rich-content
        v-if="!editing"
        :html="content"
        :emoji="announcement.emojis"
        :handle-links="true"
      />
      <announcement-editor
        v-else
        :announcement="newAnnouncement"
      />
    </div>
    <div class="footer">
      <div class="times">
        <span v-if="startsAt">
          {{ $t('announcements.start_time_display', { time: startsAt }) }}
        </span>
        <span v-if="endsAt">
          {{ $t('announcements.end_time_display', { time: endsAt }) }}
        </span>
      </div>
      <div class="actions">
        <button
          v-if="currentUser"
          class="btn button-default"
          :class="{ toggled: isRead }"
          @click="markAsRead"
        >
          {{ $t('announcements.mark_as_read_action') }}
        </button>
        <button
          v-if="currentUser && currentUser.role === 'admin'"
          class="btn button-default"
          @click="deleteAnnouncement"
        >
          {{ $t('announcements.delete_action') }}
        </button>
      </div>
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

  .footer {
    display: flex;
    flex-direction: column;
    .times {
      display: flex;
      flex-direction: column;
    }
  }

  .footer .actions {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .btn {
      min-width: 10em;
    }
  }
}
</style>
