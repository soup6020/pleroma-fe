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
        <slot />
      </span>
      {{ ' ' }}
      <ModifiedIndicator
        :changed="isChanged"
        :onclick="reset"
      />
      <ProfileSettingIndicator :is-profile="isProfileSetting" />
      <DraftButtons />
    </Checkbox>
  </label>
</template>

<script src="./boolean_setting.js"></script>
