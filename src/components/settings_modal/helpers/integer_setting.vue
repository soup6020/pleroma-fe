<template>
  <span
    v-if="matchesExpertLevel"
    class="IntegerSetting"
  >
    <label :for="path">
      <slot />
    </label>
    <input
      :id="path"
      class="number-input"
      type="number"
      step="1"
      :disabled="disabled"
      :min="min || 0"
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
  </span>
</template>

<script src="./integer_setting.js"></script>
