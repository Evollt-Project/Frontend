<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <SidebarMenuButton class="py-5">
    <ColorScheme :icon-style="{ width: '21px', height: '21px' }" />
    <NuxtLink
      :to="{
        name: 'index',
      }"
      class="title text-xl cursor-pointer"
    >
      Evollt School
    </NuxtLink>
  </SidebarMenuButton>
</template>

<style scoped lang="scss">
.title {
  font-family: var(--logoFont);
}
</style>
