<template>
  <ul>
    <li v-for="item in list" :key="item.name">
      <router-link
        class="menu-item"
        :to="{ name: (currentUser || item.anon) ? item.route : item.anonRoute, params: { username: currentUser.screen_name } }"
      >
        <FAIcon
          fixed-width
          class="fa-scale-110 fa-old-padding "
          :icon="item.icon"
        />{{ $t(item.label) }}
        <button
          type="button"
          class="button-unstyled"
          @click.stop.prevent="togglePin(item.name)"
          >
          <FAIcon
            fixed-width
            class="fa-scale-110 fa-old-padding "
            :class="{ 'veryfaint': !isPinned(item.name) }"
            :transform="!isPinned(item.name) ? 'rotate-45' : ''"
            icon="thumbtack"
          />
        </button>
      </router-link>
    </li>
  </ul>
</template>

<script src="./timeline_menu_content.js"></script>
