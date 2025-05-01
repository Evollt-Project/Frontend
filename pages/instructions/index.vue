<script setup lang="ts">

const search: Object = ref("");
definePageMeta({
  layout: "academy-support",
});
</script>

<template>
<div class="pt-12 px-[32px] ">
  <div class="mx-auto">
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details="auto"
      single-line
      rounded="lg"
    />
    <div class="mt-12 flex flex-wrap gap-10 justify-center">
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
