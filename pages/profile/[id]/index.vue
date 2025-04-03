<script setup lang="ts">
import type { IUser } from "~/types/IUser";

definePageMeta({
  name: "other-profile",
});

type UserResponse = IUser | { message: string } | null;
const user: Ref<UserResponse> = ref(null);
const route = useRoute();
const loading = ref(true);
onMounted(async () => {
  user.value = await User.getById(Number(route.params["id"]));
  loading.value = false;
});
</script>

<template>
  <div class="container mx-auto mt-5">
    <div v-if="loading" class="flex justify-center">
      <MyLoader size="50" />
    </div>
    <div v-else-if="user">
      <div
        v-if="user && 'message' in user"
        class="flex justify-center text-2xl"
      >
        {{ user.message }}
      </div>
      <Profile v-else :user="user" />
    </div>
    <div v-else class="container mx-auto mt-5">Ошибка загрузки данных</div>
  </div>
</template>

<style scoped lang="scss"></style>
