<template>
  <router-link
    v-if="to"
    :to="to"
    custom
    v-slot="props"
  >
    <slot
      v-bind="props"
    />
  </router-link>
  <slot
    v-else
    v-bind="{}"
  />
</template>

<script>
export default {
  props: ['to']
}
</script>
