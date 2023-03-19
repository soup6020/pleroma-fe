<template>
  <tab-switcher
    ref="tabSwitcher"
    class="settings_tab-switcher"
    :side-tab-bar="true"
    :scrollable-tabs="true"
    :body-scroll-lock="bodyLock"
  >
    <div
      :label="$t('admin_dash.instance')"
      icon="wrench"
      data-tab-name="general"
    >
      <InstanceTab />
    </div>
    <div
      :label="$t('admin_dash.limits')"
      icon="wrench"
      data-tab-name="limits"
    >
      <LimitsTab />
    </div>
  </tab-switcher>
</template>

<script src="./settings_modal_admin_content.js"></script>

<style src="./settings_modal_admin_content.scss" lang="scss"></style>
