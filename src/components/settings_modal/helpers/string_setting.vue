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
      :value="state"
      @change="update"
    >
    {{ ' ' }}
    <ModifiedIndicator
      :changed="isChanged"
      :onclick="reset"
    />
  </label>
</template>

<script src="./boolean_setting.js"></script>
