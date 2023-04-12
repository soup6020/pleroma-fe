<template>
  <span
    v-if="matchesExpertLevel"
    class="AttachmentSetting"
  >
    <label :for="path" :class="{ 'faint': shouldBeDisabled }">
      <template v-if="backendDescriptionLabel">
        {{ backendDescriptionLabel + ' ' }}
      </template>
      <template v-else>
        <slot />
      </template>

    </label>
    <p
      v-if="backendDescriptionDescription"
      class="setting-description"
      :class="{ 'faint': shouldBeDisabled }"
    >
      {{ backendDescriptionDescription + ' ' }}
    </p>
    <div class="attachment-input">
      <Attachment
        class="attachment"
        :compact="compact"
        :attachment="attachment"
        size="small"
        hide-description
        @setMedia="onMedia"
        @naturalSizeLoad="onNaturalSizeLoad"
      />
      <div class="controls">
        <media-upload
          normal-button
          ref="mediaUpload"
          class="media-upload-icon"
          :drop-files="dropFiles"
          @uploaded="setMediaFile"
          @upload-failed="uploadFailed"
        />
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
      </div>
    </div>
    <DraftButtons />
  </span>
</template>

<script src="./attachment_setting.js"></script>

<style lang="scss">
.AttachmentSetting {
  .attachment {
    display: block;
    width: 20em;
    height: 15em;
  }
}
</style>
