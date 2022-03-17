<template>
  <div class="panel panel-default announcements-page">
    <div class="panel-heading">
      <span>
        {{ $t('announcements.page_header') }}
      </span>
    </div>
    <div class="panel-body">
      <section
        v-if="currentUser && currentUser.role === 'admin'"
      >
        <div class="post-form">
          <div class="heading">
            <h4>{{ $t('announcements.post_form_header') }}</h4>
          </div>
          <div class="body">
            <textarea
              ref="textarea"
              v-model="newAnnouncement.content"
              class="post-textarea"
              rows="1"
              cols="1"
              :placeholder="$t('announcements.post_placeholder')"
              :disabled="posting"
            />
            <span class="announcement-metadata">
              <label for="announcement-start-time">{{ $t('announcements.start_time_prompt') }}</label>
              <input
                id="announcement-start-time"
                v-model="newAnnouncement.startsAt"
                :type="newAnnouncement.allDay ? 'date' : 'datetime-local'"
              >
            </span>
            <span class="announcement-metadata">
              <label for="announcement-end-time">{{ $t('announcements.end_time_prompt') }}</label>
              <input
                id="announcement-end-time"
                v-model="newAnnouncement.endsAt"
                :type="newAnnouncement.allDay ? 'date' : 'datetime-local'"
              >
            </span>
            <span class="announcement-metadata">
              <Checkbox
                id="announcement-all-day"
                v-model="newAnnouncement.allDay"
              />
              <label for="announcement-all-day">{{ $t('announcements.all_day_prompt') }}</label>
            </span>
          </div>
          <div class="footer">
            <button
              class="btn button-default post-button"
              :disabled="posting"
              @click.prevent="postAnnouncement"
            >
              {{ $t('announcements.post_action') }}
            </button>
            <div
              v-if="error"
              class="alert error"
            >
              {{ $t('announcements.post_error', { error }) }}
              <button
                class="button-unstyled"
                @click="clearError"
              >
                <FAIcon
                  class="fa-scale-110 fa-old-padding"
                  icon="times"
                  :title="$t('announcements.close_error')"
                />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        v-for="announcement in announcements"
        :key="announcement.id"
      >
        <announcement
          :announcement="announcement"
        />
      </section>
    </div>
  </div>
</template>

<script src="./announcements_page.js"></script>

<style lang="scss">
@import "../../variables";

.announcements-page {
  .post-form {
    padding: var(--status-margin, $status-margin);

    .heading, .body {
      margin-bottom: var(--status-margin, $status-margin);
    }

    .body {
      display: flex;
      align-items: stretch;
      flex-direction: column;
      .announcement-metadata {
        margin-top: 0.5em;
      }
    }

    .post-textarea {
      resize: vertical;
      height: 10em;
      overflow: none;
      box-sizing: content-box;
    }

    .post-button {
      min-width: 10em;
    }
  }
}
</style>
