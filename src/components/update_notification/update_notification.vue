<template>
  <Modal
    :is-open="true"
    class="UpdateNotification"
    :class="{ peek: modalPeeked }"
    :no-background="true"
  >
    <div class="UpdateNotificationModal panel">
      <div class="panel-heading">
        <span class="title">
          {{ $t('update.big_update_title') }}
        </span>
      </div>
      <div class="panel-body">
        <p>
          {{ $t('update.big_update_content') }}
        </p>
        <p>
        <button
          class="button-unstyled -link tall-status-hider"
          @click.prevent="toggleShowMore"
        >
          {{ $t("general.show_more") }}
        </button>
        {{ ' ' }}
        <button
          class="button-unstyled -link tall-status-hider"
          @click.prevent="toggleShowMore"
        >
          {{ $t("general.never_show_again") }}
        </button>
          </p>
        <img class="pleroma-tan" :src="pleromaTanVariant"/>
      </div>
    </div>
  </Modal>
</template>

<script src="./update_notification.js"></script>

<style src="./update_notification.scss" lang="scss"></style>
