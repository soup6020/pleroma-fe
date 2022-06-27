<template>
  <div class="dropdown-menu">
    <router-link
      v-if="currentUser"
      class="dropdown-item button-default"
      :to="{ name: 'friends' }"
    >
      <FAIcon
        fixed-width
        class="fa-scale-110 fa-old-padding "
        icon="home"
      />{{ $t("nav.home_timeline") }}
    </router-link>
    <router-link
      v-if="currentUser || !privateMode"
      class="dropdown-item button-default"
      :to="{ name: 'public-timeline' }"
    >
      <FAIcon
        fixed-width
        class="fa-scale-110 fa-old-padding "
        icon="users"
      />{{ $t("nav.public_tl") }}
    </router-link>
    <router-link
      v-if="federating && (currentUser || !privateMode)"
      class="dropdown-item button-default"
      :to="{ name: 'public-external-timeline' }"
    >
      <FAIcon
        fixed-width
        class="fa-scale-110 fa-old-padding "
        icon="globe"
      />{{ $t("nav.twkn") }}
    </router-link>
    <router-link
      v-if="currentUser"
      class="dropdown-item button-default"
      :to="{ name: 'bookmarks'}"
    >
      <FAIcon
        fixed-width
        class="fa-scale-110 fa-old-padding "
        icon="bookmark"
      />{{ $t("nav.bookmarks") }}
    </router-link>
    <router-link
      v-if="currentUser"
      class="dropdown-item button-default"
      :to="{ name: 'dms', params: { username: currentUser.screen_name } }"
    >
      <FAIcon
        fixed-width
        class="fa-scale-110 fa-old-padding "
        icon="envelope"
      />{{ $t("nav.dms") }}
    </router-link>
  </div>
</template>

<script src="./timeline_menu_content.js" ></script>
