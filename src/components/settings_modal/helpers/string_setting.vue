<template>
  <label
    v-if="matchesExpertLevel"
    class="StringSetting"
  >
    <label
      :for="path"
      :class="{ 'faint': shouldBeDisabled }"
    >
      <template v-if="backendDescriptionLabel">
        {{ backendDescriptionLabel + ' ' }}
      </template>
      <template v-else>
        <slot />
      </template>
    </label>
    <input
      :id="path"
      class="string-input"
      :disabled="shouldBeDisabled"
      :value="realDraftMode ? draft : state"
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
      :class="{ 'faint': shouldBeDisabled }"
    >
      {{ backendDescriptionDescription + ' ' }}
    </p>
  </label>
</template>

<script src="./string_setting.js"></script>
