<template>
  <div class="panel panel-default announcements-page">
    <div class="panel-heading">
      <span>
        {{ $t('announcements.page_header') }}
      </span>
    </div>
    <div class="panel-body">
      <section
        v-for="announcement in announcements"
        :key="announcement.id"
      >
        <announcement
          :announcement="announcement"
        />
      </section>
    </div>
  </div>
</template>

<script src="./announcements_page.js"></script>
