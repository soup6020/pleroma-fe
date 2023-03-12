<template>
  <label
    v-if="matchesExpertLevel"
    class="BooleanSetting"
  >
    <Checkbox
      :model-value="state"
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
      <ProfileSettingIndicator :is-profile="isProfileTied" />
    </Checkbox>
  </label>
</template>

<script src="./boolean_setting.js"></script>
