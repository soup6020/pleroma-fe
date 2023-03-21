<template>
  <label
    v-if="matchesExpertLevel"
    class="BooleanSetting"
  >
    <Checkbox
      :model-value="draftMode ? draft :state"
      :disabled="shouldBeDisabled"
      @update:modelValue="update"
    >
      <span
        v-if="!!$slots.default"
        class="label"
      >
        <template v-if="backendDescription">
          {{ backendDescriptionLabel }}
        </template>
        <template v-else>
          <slot />
        </template>
      </span>
    </Checkbox>
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

<script src="./boolean_setting.js"></script>
