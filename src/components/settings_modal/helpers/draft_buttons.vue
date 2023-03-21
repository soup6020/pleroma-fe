<!-- this is a helper exclusive to Setting components -->
<!-- TODO make it reusable -->
<template>
  <span
    class="DraftButtons"
  >
    <Popover
      v-if="$parent.isDirty"
      trigger="hover"
      :trigger-attrs="{ 'aria-label': $t('settings.commit_value_tooltip') }"
    >
      <template #trigger>
        &nbsp;
        <button
          class="button button-default btn"
          type="button"
          :title="$t('settings.commit_value')"
          @click="$parent.commitDraft"
        >
          {{ $t('settings.commit_value') }}
        </button>
      </template>
      <template #content>
        <div class="modified-tooltip">
          {{ $t('settings.commit_value_tooltip') }}
        </div>
      </template>
    </Popover>
    <Popover
      v-if="$parent.isDirty"
      trigger="hover"
      :trigger-attrs="{ 'aria-label': $t('settings.reset_value_tooltip') }"
    >
      <template #trigger>
        &nbsp;
        <button
          class="button button-default btn"
          type="button"
          :title="$t('settings.reset_value')"
          @click="$parent.reset"
        >
          {{ $t('settings.reset_value') }}
        </button>
      </template>
      <template #content>
        <div class="modified-tooltip">
          {{ $t('settings.reset_value_tooltip') }}
        </div>
      </template>
    </Popover>
    <Popover
      trigger="hover"
      :trigger-attrs="{ 'aria-label': $t('settings.hard_reset_value_tooltip') }"
    >
      <template #trigger>
        &nbsp;
        <button
          v-if="$parent.canHardReset"
          class="button button-default btn"
          type="button"
          :title="$t('settings.hard_reset_value')"
          @click="$parent.hardReset"
        >
          {{ $t('settings.hard_reset_value') }}
        </button>
      </template>
      <template #content>
        <div class="modified-tooltip">
          {{ $t('settings.hard_reset_value_tooltip') }}
        </div>
      </template>
    </Popover>
  </span>
</template>

<script>
import Popover from 'src/components/popover/popover.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWrench } from '@fortawesome/free-solid-svg-icons'

library.add(
  faWrench
)

export default {
  components: { Popover },
  props: ['changed']
}
</script>

<style lang="scss">
.DraftButtons {
  display: inline-block;
  position: relative;
}

.draft-tooltip {
  margin: 0.5em 1em;
  min-width: 10em;
  text-align: center;
}
</style>
