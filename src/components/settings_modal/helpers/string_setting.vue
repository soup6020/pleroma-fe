<template>
  <label
    v-if="matchesExpertLevel"
    class="StringSetting"
  >
    <label :for="path">
      <slot />
    </label>
    <input
      :id="path"
      class="string-input"
      step="1"
      :disabled="disabled"
      :value="draftMode ? draft :state"
      @change="update"
    >
    {{ ' ' }}
    <ModifiedIndicator
      :changed="isChanged"
      :onclick="reset"
    />
    <ProfileSettingIndicator :is-profile="isProfileSetting" />
    <DraftButtons />
  </label>
</template>

<script src="./string_setting.js"></script>
