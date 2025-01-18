<script setup lang="ts">
import { toast } from "vue3-toastify";

definePageMeta({
  name: "settings-profile",
  layout: "sidebar",
});
const loading = ref(false);
const data = ref({
  first_name: User.store.user?.first_name ?? "",
  surname: "" as string,
  city: "" as string,
  skills: "" as string,
  gender: null as number | null,
  description: "" as string,
  privacy: false as boolean,
  avatar: "" as string,
});
const gender = ref([
  { id: 1, title: "Мужской" },
  { id: 2, title: "Женский" },
]);
const form = ref(null);
const saveProfile = async () => {
  if (form.value) {
    // @ts-ignore
    const { valid } = await form.value.validate();

    if (valid) {
      loading.value = true;
      toast.success("Отредактировано");
      loading.value = false;
    }
  }
};
const validate = () => {
  if (loading.value) {
    return true;
  }

  return false;
};
</script>

<template>
  <div class="settings sidebar-content" v-if="User.store.user">
    <h1 class="text-4xl font-bold mb-4">Редактирование профиля</h1>
    <div>
      <v-form fast-fail ref="form" class="mt-4 grid gap-5" @submit.prevent>
        <div class="grid grid-cols-2 gap-5">
          <div class="flex items-center gap-5">
            <v-avatar
              size="100"
              :image="
                User.store.userPhotoUrl(
                  User.store.user.avatar,
                  User.store.user.first_name
                )
              "
            />
            <MyButton size="large">
              <v-icon class="mr-3" icon="mdi-tray-arrow-up"></v-icon>
              Загрузить
            </MyButton>
          </div>
          <div>
            <v-text-field
              :rules="Rule.getRequired()"
              :disabled="loading"
              v-model="data.first_name"
              rounded="lg"
              label="Имя"
              prepend-inner-icon="mdi-account-circle-outline"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
            <v-text-field
              :disabled="loading"
              v-model="data.surname"
              rounded="lg"
              label="Фамилия"
              prepend-inner-icon="mdi-account-circle-outline"
              hide-details
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <v-text-field
            :disabled="loading"
            v-model="data.city"
            rounded="lg"
            label="Должность"
            prepend-inner-icon="mdi-shopping-outline"
            hide-details
            variant="outlined"
            density="comfortable"
          ></v-text-field>
          <v-select
            v-model="data.gender"
            :items="gender"
            rounded="lg"
            item-title="title"
            item-value="id"
            label="Пол"
            :prepend-inner-icon="
              data.gender != 2 ? 'mdi-gender-male' : 'mdi-gender-female'
            "
            hide-details
            variant="outlined"
            density="comfortable"
          ></v-select>
        </div>
        <v-text-field
          :disabled="loading"
          v-model="data.skills"
          rounded="lg"
          label="Умения, через запятую"
          prepend-inner-icon="mdi-certificate-outline"
          hide-details
          variant="outlined"
          density="comfortable"
        ></v-text-field>
        <v-textarea
          :disabled="loading"
          v-model="data.description"
          rounded="lg"
          label="О себе"
          prepend-inner-icon="mdi-image-text"
          hide-details
          variant="outlined"
          no-resize
          density="comfortable"
        ></v-textarea>
        <v-checkbox
          v-model="data.privacy"
          hide-details
          label="Сделать профиль приватным"
        ></v-checkbox>

        <MyButton
          size="large"
          type="submit"
          @click="saveProfile"
          :disabled="validate()"
          :loading="loading"
          block
        >
          Сохранить изменения
        </MyButton>
      </v-form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
