<template>
  <span
    v-if="matchesExpertLevel"
    class="NumberSetting"
  >
    <label :for="path">
      <slot />
    </label>
    <input
      :id="path"
      class="number-input"
      type="number"
      :step="step || 1"
      :disabled="disabled"
      :min="min || 0"
      :value="state"
      @change="update"
    >
    {{ ' ' }}
    <ModifiedIndicator
      :changed="isChanged"
      :onclick="reset"
    />
  </span>
</template>

<script src="./number_setting.js"></script>
