<template>
  <tab-switcher
    ref="tabSwitcher"
    class="settings_tab-switcher"
    :side-tab-bar="true"
    :scrollable-tabs="true"
    :body-scroll-lock="bodyLock"
  >
    <div
      :label="$t('settings.general')"
      icon="wrench"
      data-tab-name="general"
    >
      <InstanceTab />
    </div>
  </tab-switcher>
</template>

<script src="./settings_modal_admin_content.js"></script>

<style src="./settings_modal_admin_content.scss" lang="scss"></style>
