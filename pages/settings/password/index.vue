<script setup lang="ts">
import { toast } from "vue3-toastify";

definePageMeta({
  name: "settings-password",
  layout: "sidebar",
});
const loading = ref(false);
const form = ref(null);
const data = ref({
  old_password: "" as string,
  password: "" as string,
  password_confirmation: "" as string,
});

const showOldPassword = ref(false);
const showPassword = ref(false);
const showConfirmationPassword = ref(false);

const saveNewPassword = async () => {
  if (form.value) {
    // @ts-ignore
    const { valid } = await form.value.validate();

    if (valid) {
      loading.value = true;
      await User.changePassword(data.value)
        .then((response) => {
          toast.success(response.data.message);
          // @ts-ignore
          form.value.reset();
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        });
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
  <div class="settings sidebar-content">
    <h1 class="text-4xl font-bold mb-4">Изменить пароль</h1>
    <v-form fast-fail ref="form" class="mt-6" @submit.prevent>
      <v-text-field
        v-model="data.old_password"
        :rules="Rule.getPassword()"
        :disabled="loading"
        rounded="lg"
        label="Текущий пароль"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="showOldPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showOldPassword ? 'text' : 'password'"
        @click:append-inner="showOldPassword = !showOldPassword"
        variant="outlined"
        density="comfortable"
      ></v-text-field>
      <v-text-field
        v-model="data.password"
        :rules="Rule.getPassword()"
        :disabled="loading"
        rounded="lg"
        label="Новый пароль"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        @click:append-inner="showPassword = !showPassword"
        variant="outlined"
        density="comfortable"
      ></v-text-field>

      <v-text-field
        v-model="data.password_confirmation"
        :rules="Rule.getPasswordConfirmation(data.password)"
        :disabled="loading"
        rounded="lg"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="
          showConfirmationPassword ? 'mdi-eye-off' : 'mdi-eye'
        "
        :type="showConfirmationPassword ? 'text' : 'password'"
        @click:append-inner="
          showConfirmationPassword = !showConfirmationPassword
        "
        label="Новый пароль (еще раз)"
        variant="outlined"
        density="comfortable"
      ></v-text-field>
      <MyButton
        size="large"
        type="submit"
        color="success"
        @click="saveNewPassword"
        :disabled="validate()"
        :loading="loading"
        block
      >
        Сохранить изменения
      </MyButton>
    </v-form>
  </div>
</template>

<style scoped lang="scss"></style>
