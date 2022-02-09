<template>
  <dialog-modal
    v-if="showing"
    class="confirm-modal"
    :onCancel="onCancel"
  >
    <template v-slot:header>
      <span v-text="title"></span>
    </template>

    <slot></slot>

    <template v-slot:footer>
      <button
        class="btn button-default"
        v-text="confirmText"
        @click.prevent="onAccept"
      ></button>

      <button
        class="btn button-default"
        v-text="cancelText"
        @click.prevent="onCancel"
      ></button>
    </template>
  </dialog-modal>
</template>

<script src="./confirm_modal.js"></script>
