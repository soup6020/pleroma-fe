<template>
  <label
    v-if="matchesExpertLevel"
    class="StringSetting"
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
    <p
      v-if="backendDescriptionDescription"
      class="setting-description"
    >
      {{ backendDescriptionDescription + ' ' }}
    </p>
  </label>
</template>

<script src="./string_setting.js"></script>
