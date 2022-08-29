<template>
  <li class="NavigationEntry">
    <component
      :is="routeTo ? 'router-link' : 'button'"
      class="menu-item button-unstyled"
      :to="routeTo"
    >
      <span>
        <FAIcon
          v-if="item.icon"
          fixed-width
          class="fa-scale-110 menu-icon"
          :icon="item.icon"
        />
      </span>
      <span
        v-if="item.iconLetter"
        class="icon iconLetter fa-scale-110 menu-icon"
      >{{ item.iconLetter }}
      </span>
      <span class="label">
      {{ item.labelRaw || $t(item.label) }}
      </span>
      <slot />
      <div
        v-if="item.badgeGetter && getters[item.badgeGetter]"
        class="badge badge-notification"
      >
        {{ getters[item.badgeGetter] }}
      </div>
      <button
        v-if="showPin && currentUser"
        type="button"
        class="button-unstyled extra-button"
        :title="$t(isPinned ? 'general.unpin' : 'general.pin' )"
        :aria-pressed="!!isPinned"
        @click.stop.prevent="togglePin(item.name)"
      >
        <FAIcon
          v-if="showPin && currentUser"
          fixed-width
          class="fa-scale-110"
          :class="{ 'veryfaint': !isPinned(item.name) }"
          :transform="!isPinned(item.name) ? 'rotate-45' : ''"
          icon="thumbtack"
        />
      </button>
    </component>
  </li>
</template>

<script src="./navigation_entry.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.NavigationEntry {
  .label {
    flex: 1;
  }

  .menu-icon {
    margin-right: 0.8em;
  }

  .extra-button {
    width: 3em;
    text-align: center;

    &:last-child {
      margin-right: -0.8em;
    }
  }

  .menu-item {
    display: flex;
    box-sizing: border-box;
    align-items: baseline;
    height: 3.5em;
    line-height: 3.5em;
    padding: 0 1em;
    width: 100%;
    color: $fallback--link;
    color: var(--link, $fallback--link);

    &:hover {
      background-color: $fallback--lightBg;
      background-color: var(--selectedMenu, $fallback--lightBg);
      color: $fallback--link;
      color: var(--selectedMenuText, $fallback--link);
      --faint: var(--selectedMenuFaintText, $fallback--faint);
      --faintLink: var(--selectedMenuFaintLink, $fallback--faint);
      --lightText: var(--selectedMenuLightText, $fallback--lightText);

      .menu-icon {
        --icon: var(--text, $fallback--icon);
      }
    }

    &.router-link-active {
      font-weight: bolder;
      background-color: $fallback--lightBg;
      background-color: var(--selectedMenu, $fallback--lightBg);
      color: $fallback--text;
      color: var(--selectedMenuText, $fallback--text);
      --faint: var(--selectedMenuFaintText, $fallback--faint);
      --faintLink: var(--selectedMenuFaintLink, $fallback--faint);
      --lightText: var(--selectedMenuLightText, $fallback--lightText);

      .menu-icon {
        --icon: var(--text, $fallback--icon);
      }

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
