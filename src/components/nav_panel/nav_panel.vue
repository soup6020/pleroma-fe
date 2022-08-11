<template>
  <div class="NavPanel">
    <div class="panel panel-default">
      <div class="panel-heading">
        <NavigationPins />
        <div class="spacer"/>
        <button
          class="button-unstyled"
          @click="toggleCollapse"
        >
          <FAIcon
            class="timelines-chevron"
            fixed-width
            :icon="collapsed ? 'chevron-down' : 'chevron-up'"
          />
        </button>
      </div>
      <ul class="panel-body" v-if="!collapsed">
        <li v-if="currentUser || !privateMode">
          <button
            class="button-unstyled menu-item"
            @click="toggleTimelines"
          >
            <FAIcon
              fixed-width
              class="fa-scale-110"
              icon="stream"
            />{{ $t("nav.timelines") }}
            <FAIcon
              class="timelines-chevron"
              fixed-width
              :icon="showTimelines ? 'chevron-up' : 'chevron-down'"
            />
          </button>
          <div
            v-show="showTimelines"
            class="timelines-background"
          >
            <ul class="timelines">
              <NavigationEntry v-for="item in timelinesList" :key="item.name" :show-pin="true" :item="item" />
            </ul>
          </div>
        </li>
        <li v-if="currentUser">
          <button
            class="button-unstyled menu-item"
            @click="toggleLists"
          >
              <FAIcon
                fixed-width
                class="fa-scale-110"
                icon="list"
              />{{ $t("nav.lists") }}
            <FAIcon
              class="timelines-chevron"
              fixed-width
              :icon="showLists ? 'chevron-up' : 'chevron-down'"
            />
            <router-link
              :to="{ name: 'lists' }"
              @click.stop
            >
              <FAIcon
                class="timelines-chevron"
                fixed-width
                icon="wrench"
              />
            </router-link>
          </button>
          <div
            v-show="showLists"
            class="timelines-background"
          >
            <ListsMenuContent :showPin="true" class="timelines" />
          </div>
        </li>
        <NavigationEntry v-for="item in rootItems" :key="item.name" :show-pin="true" :item="item" />
      </ul>
    </div>
  </div>
</template>

<script src="./nav_panel.js"></script>

<style lang="scss">
@import '../../_variables.scss';

.NavPanel {
  .panel {
    overflow: hidden;
    box-shadow: var(--panelShadow);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    position: relative;
    border-bottom: 1px solid;
    border-color: $fallback--border;
    border-color: var(--border, $fallback--border);
    padding: 0;
  }

  > li {
    &:first-child .menu-item {
      border-top-right-radius: $fallback--panelRadius;
      border-top-right-radius: var(--panelRadius, $fallback--panelRadius);
      border-top-left-radius: $fallback--panelRadius;
      border-top-left-radius: var(--panelRadius, $fallback--panelRadius);
    }

    &:last-child .menu-item {
      border-bottom-right-radius: $fallback--panelRadius;
      border-bottom-right-radius: var(--panelRadius, $fallback--panelRadius);
      border-bottom-left-radius: $fallback--panelRadius;
      border-bottom-left-radius: var(--panelRadius, $fallback--panelRadius);
    }
  }

  li:last-child {
    border: none;
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

  .timelines-chevron {
    margin-left: 0.8em;
    font-size: 1.1em;
  }

  .timelines-background {
    padding: 0 0 0 0.6em;
    background-color: $fallback--lightBg;
    background-color: var(--selectedMenu, $fallback--lightBg);
    border-top: 1px solid;
    border-color: $fallback--border;
    border-color: var(--border, $fallback--border);
  }

  .timelines {
    background-color: $fallback--bg;
    background-color: var(--bg, $fallback--bg);
  }

  .fa-scale-110 {
    margin-right: 0.8em;
  }

}
</style>
