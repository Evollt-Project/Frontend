<script setup lang="ts"></script>

<template>
  <div
    class="h-screen justify-center items-center"
    :style="{
      display: Loader.store.loading ? 'flex' : 'none',
    }"
  >
    <div class="w-2/4">
      <v-progress-linear height="8" rounded indeterminate></v-progress-linear>
    </div>
  </div>
  <div>
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
