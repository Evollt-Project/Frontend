<script setup lang="ts">
import type { ILogin } from "~/types/Auth";

const props = defineProps<{
  loading: boolean;
}>();
const emits = defineEmits(["loading", "dialog"]);
const data: Ref<ILogin> = ref({
  email: "evollt@gmail.com",
  password: "qwerty12!!",
});
const showPassword: Ref<boolean> = ref(false);
const form = ref(null);

const login = async () => {
  // @ts-ignore
  const { valid } = await form.value.validate();

  if (valid) {
    emits("loading", true);
    const response = await User.login(data.value);

    if (response.token) {
      emits("dialog", false);
    }
    emits("loading", false);
  }
};

const validate = () => {
  if (props.loading) {
    return true;
  }

  return false;
};
</script>

<template>
  <v-form fast-fail ref="form" class="mt-4" @submit.prevent>
    <v-text-field
      v-model="data.email"
      :rules="Rule.getEmail()"
      :disabled="loading"
      rounded="lg"
      label="Email"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      density="comfortable"
    ></v-text-field>

    <v-text-field
      v-model="data.password"
      :rules="Rule.getPassword()"
      :disabled="loading"
      rounded="lg"
      label="Пароль"
      prepend-inner-icon="mdi-lock-outline"
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showPassword ? 'text' : 'password'"
      @click:append-inner="showPassword = !showPassword"
      variant="outlined"
      density="comfortable"
    ></v-text-field>

    <MyButton
      class="mt-4"
      size="large"
      type="submit"
      @click="login"
      :disabled="validate()"
      :loading="loading"
      block
      >Войти</MyButton
    >
  </v-form>
</template>

<style scoped lang="scss"></style>
