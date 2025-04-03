<script setup lang="ts">
import type { IRegister } from "~/types/Auth";

const props = defineProps<{
  loading: boolean;
}>();
const emits = defineEmits(["loading", "dialog"]);
const data: Ref<IRegister> = ref({
  first_name: "Evollt",
  email: "evollt@gmail.com",
  password: "qwerty12!",
  password_confirmation: "qwerty12!",
});
const showPassword: Ref<boolean> = ref(false);
const showConfirmationPassword: Ref<boolean> = ref(false);
const form = ref(null);

const register = async () => {
  // @ts-ignore
  const { valid } = await form.value.validate();

  if (valid) {
    emits("loading", true);
    await User.register(data.value);
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
  <v-form fast-fail ref="form" class="mt-4 grid gap-5" @submit.prevent>
    <v-text-field
      v-model="data.first_name"
      :rules="Rule.getRequired()"
      :disabled="loading"
      rounded="lg"
      hide-details="auto"
      label="Имя"
      prepend-inner-icon="mdi-account-circle-outline"
      variant="outlined"
      density="comfortable"
    ></v-text-field>

    <v-text-field
      v-model="data.email"
      :rules="Rule.getEmail()"
      :disabled="loading"
      rounded="lg"
      label="Email"
      hide-details="auto"
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
      hide-details="auto"
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
      :append-inner-icon="showConfirmationPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showConfirmationPassword ? 'text' : 'password'"
      @click:append-inner="showConfirmationPassword = !showConfirmationPassword"
      hide-details="auto"
      label="Подтвердите пароль"
      variant="outlined"
      density="comfortable"
    ></v-text-field>

    <MyButton
      class="mt-4"
      size="large"
      type="submit"
      @click="register"
      :disabled="validate()"
      :loading="loading"
      block
    >
      Зарегистрироваться
    </MyButton>
  </v-form>
</template>

<style scoped lang="scss"></style>
