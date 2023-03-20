<template>
  <span
    v-if="matchesExpertLevel"
    class="NumberSetting"
  >
    <label :for="path">
      <template v-if="backendDescription">
        {{ backendDescriptionLabel + ' ' }}
      </template>
      <template v-else>
        <slot />
      </template>
    </label>
    <input
      :id="path"
      class="number-input"
      type="number"
      :step="step || 1"
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
    <p
      v-if="backendDescriptionDescription"
      class="setting-description"
    >
      {{ backendDescriptionDescription + ' ' }}
    </p>
  </span>
</template>

<script src="./number_setting.js"></script>
