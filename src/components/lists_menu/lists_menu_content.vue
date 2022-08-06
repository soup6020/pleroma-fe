<template>
  <ul>
    <li
      v-for="list in lists.slice().reverse()"
      :key="list.id"
    >
      <router-link
        class="menu-item"
        :to="{ name: 'list-timeline', params: { id: list.id } }"
      >
        {{ list.title }}
      </router-link>
    </li>
  </ul>
</template>

<script src="./lists_menu_content.js"></script>
