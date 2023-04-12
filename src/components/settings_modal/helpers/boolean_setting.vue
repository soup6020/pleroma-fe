<template>
  <label
    v-if="matchesExpertLevel"
    class="BooleanSetting"
  >
    <Checkbox
      :model-value="visibleState"
      :disabled="shouldBeDisabled"
      :indeterminate="isIndeterminate"
      @update:modelValue="update"
    >
      <span
        v-if="!!$slots.default"
        class="label"
        :class="{ 'faint': shouldBeDisabled }"
      >
        <template v-if="backendDescriptionLabel">
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
      :class="{ 'faint': shouldBeDisabled }"
    >
      {{ backendDescriptionDescription + ' ' }}
    </p>
  </label>
</template>

<script src="./boolean_setting.js"></script>
