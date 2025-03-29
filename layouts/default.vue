<script setup lang="ts"></script>

<template>
  <div
    v-if="Loader.store.loading"
    class="h-screen flex justify-center items-center"
  >
    <div class="w-2/4">
      <v-progress-linear height="8" rounded indeterminate></v-progress-linear>
    </div>
  </div>
  <div v-else>
    <Header />
    <div class="main-content">
      <slot></slot>
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.main-content {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
}
</style>
