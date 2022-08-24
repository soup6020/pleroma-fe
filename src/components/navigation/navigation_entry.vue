<template>
  <li class="NavigationEntry">
    <router-link
      class="menu-item"
      :to="routeTo"
    >
      <FAIcon
        v-if="item.icon"
        fixed-width
        class="fa-scale-110"
        :icon="item.icon"
      />
      <span
        v-if="item.iconLetter"
        class="icon iconLetter fa-scale-110"
      >{{ item.iconLetter }}
      </span>{{ item.labelRaw || $t(item.label) }}
      <button
        type="button"
        class="button-unstyled"
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
        <div
          v-if="item.badgeGetter && getters[item.badgeGetter]"
          class="badge badge-notification"
        >
          {{ getters[item.badgeGetter] }}
        </div>
      </button>
    </router-link>
  </li>
</template>

<script src="./navigation_entry.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.NavigationEntry {
  .fa-scale-110 {
    margin-right: 0.8em;
  }

  .badge {
    position: absolute;
    right: 0.6rem;
    top: 1.25em;
  }

  .menu-item {
    display: block;
    box-sizing: border-box;
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
      --icon: var(--selectedMenuIcon, $fallback--icon);
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
      --icon: var(--selectedMenuIcon, $fallback--icon);

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
