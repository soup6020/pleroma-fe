<template>
  <button
    class="btn button-default follow-button"
    :class="{ toggled: isPressed }"
    :disabled="disabled"
    :title="title"
    @click="onClick"
  >
    {{ label }}
    <teleport to="#modal">
      <confirm-modal
        v-if="showingConfirmUnfollow"
        :title="$t('user_card.unfollow_confirm_title')"
        :confirm-text="$t('user_card.unfollow_confirm_accept_button')"
        :cancel-text="$t('user_card.unfollow_confirm_cancel_button')"
        @accepted="doUnfollow"
        @cancelled="hideConfirmUnfollow"
      >
        <i18n
          path="user_card.unfollow_confirm"
          tag="span"
        >
          <span
            place="user"
            v-text="user.screen_name_ui"
          />
        </i18n>
      </confirm-modal>
    </teleport>
  </button>
</template>

<script src="./follow_button.js"></script>
