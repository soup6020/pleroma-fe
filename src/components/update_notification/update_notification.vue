<template>
  <Modal
    :is-open="shouldShow"
    class="UpdateNotification"
    :no-background="true"
  >
    <div
      class="UpdateNotificationModal panel"
      :class="{ '-peek': !showingMore }"
    >
      <div class="panel-heading">
        <span class="title">
          {{ $t('update.big_update_title') }}
        </span>
      </div>
      <div class="panel-body">
        <div class="content" ref="content">
          <img class="pleroma-tan" :src="pleromaTanVariant" :style="pleromaTanStyles"/>
          <div class="spacer-top"/>
          <div class="text">
            <p>
                {{ $t('update.big_update_content') }}
            </p>
            <p class="extra-info">
                {{ $t('update.update_bugs') }}
            </p>
            <p class="extra-info">
                {{ $t('update.update_changelog') }}
            </p>
            </div>
            <div class="spacer-bottom"/>
        </div>
      </div>
      <div class="panel-footer">
        <button
          class="button-default"
          @click.prevent="neverShowAgain"
          >
          {{ $t("general.never_show_again") }}
        </button>
        <button
          class="button-default"
          @click.prevent="toggleShow"
          v-if="!showingMore"
          >
          {{ $t("general.show_more") }}
        </button>
        <button
          class="button-default"
          @click.prevent="dismiss"
          >
          {{ $t("general.dismiss") }}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script src="./update_notification.js"></script>

<style src="./update_notification.scss" lang="scss"></style>
