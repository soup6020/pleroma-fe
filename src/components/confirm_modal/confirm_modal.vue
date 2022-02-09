<template>
  <dialog-modal
    v-if="showing"
    class="confirm-modal"
    :on-cancel="onCancel"
  >
    <template v-slot:header>
      <span v-text="title" />
    </template>

    <slot />

    <template v-slot:footer>
      <button
        class="btn button-default"
        @click.prevent="onAccept"
        v-text="confirmText"
      />

      <button
        class="btn button-default"
        @click.prevent="onCancel"
        v-text="cancelText"
      />
    </template>
  </dialog-modal>
</template>

<script src="./confirm_modal.js"></script>
