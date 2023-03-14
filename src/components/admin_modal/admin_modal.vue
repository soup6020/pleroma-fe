<template>
  <Modal
    :is-open="modalActivated"
    class="admin-modal"
    :class="{ peek: modalPeeked }"
    :no-background="modalPeeked"
  >
    <div class="admin-modal-panel panel">
      <div class="panel-heading">
        <span class="title">
          {{ $t('admin.settings') }}
        </span>
        <transition name="fade">
          <div
            v-if="currentSaveStateNotice"
            class="alert"
            :class="{ transparent: !currentSaveStateNotice.error, error: currentSaveStateNotice.error}"
            @click.prevent
          >
            {{ currentSaveStateNotice.error ? $t('admin.saving_err') : $t('settings.saving_ok') }}
          </div>
        </transition>
        <button
          class="btn button-default"
          :title="$t('general.peek')"
          @click="peekModal"
        >
          <FAIcon
            :icon="['far', 'window-minimize']"
            fixed-width
          />
        </button>
        <button
          class="btn button-default"
          :title="$t('general.close')"
          @click="closeModal"
        >
          <FAIcon
            icon="times"
            fixed-width
          />
        </button>
      </div>
      <div class="panel-body">
        <AdminModalContent v-if="modalOpenedOnce" />
      </div>
      <div class="panel-footer admin-footer">
        <Popover
          class="export"
          trigger="click"
          placement="top"
          :offset="{ y: 5, x: 5 }"
          :bound-to="{ x: 'container' }"
          remove-padding
        >
          <template #trigger>
            <button
              class="btn button-default"
              :title="$t('general.close')"
            >
              <span>{{ $t("admin.file_export_import.backup_restore") }}</span>
              {{ ' ' }}
              <FAIcon
                icon="chevron-down"
              />
            </button>
          </template>
          <template #content="{close}">
            <div class="dropdown-menu">
              <button
                class="button-default dropdown-item dropdown-item-icon"
                @click.prevent="backup"
                @click="close"
              >
                <FAIcon
                  icon="file-download"
                  fixed-width
                /><span>{{ $t("admin.file_export_import.backup_settings") }}</span>
              </button>
              <button
                class="button-default dropdown-item dropdown-item-icon"
                @click.prevent="backupWithTheme"
                @click="close"
              >
                <FAIcon
                  icon="file-download"
                  fixed-width
                /><span>{{ $t("admin.file_export_import.backup_settings_theme") }}</span>
              </button>
              <button
                class="button-default dropdown-item dropdown-item-icon"
                @click.prevent="restore"
                @click="close"
              >
                <FAIcon
                  icon="file-upload"
                  fixed-width
                /><span>{{ $t("admin.file_export_import.restore_settings") }}</span>
              </button>
            </div>
          </template>
        </Popover>

        <Checkbox
          :model-value="!!expertLevel"
          @update:modelValue="expertLevel = Number($event)"
        >
          {{ $t("admin.expert_mode") }}
        </Checkbox>
        <span
          id="unscrolled-content"
          class="extra-content"
        />
      </div>
    </div>
  </Modal>
</template>

<script src="./admin_modal.js"></script>

<style src="./admin_modal.scss" lang="scss"></style>
