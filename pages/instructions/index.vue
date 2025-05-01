<script setup lang="ts">

const search: Object = ref("");

</script>

<template>
<div class="pt-12">
  <div class="lg:mx12">
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details="auto"
      single-line
      rounded="lg"
    />
  </div>

</div>
</template>

<style scoped lang="scss">

</style>
