<script setup lang="ts">

const search: Object = ref("");
definePageMeta({
  layout: "academy-support",
});
</script>

<template>
<div class="pt-12 container">
  <div class="">
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details="auto"
      single-line
      rounded="lg"
    />
    <div class="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-6">
      <instructions-card/>
      <instructions-card/>
      <instructions-card/>
      <instructions-card/>
      <instructions-card/>
      <instructions-card/>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

</style>
