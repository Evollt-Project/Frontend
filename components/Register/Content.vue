<script setup lang="ts">
import type { IRegister } from "~/types/Auth";

const props = defineProps<{
  loading: boolean;
}>();
const emits = defineEmits(["loading", "dialog"]);
const data: Ref<IRegister> = ref({
  first_name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const form = ref(null);

const register = async () => {
  // @ts-ignore
  const { valid } = await form.value.validate();

  if (valid) {
    emits("loading", true);
    const response = await User.register(data.value);
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
      v-model="data.first_name"
      :rules="Rule.getRequired()"
      :disabled="loading"
      label="Введите имя"
      variant="outlined"
      density="comfortable"
    ></v-text-field>

    <v-text-field
      v-model="data.email"
      :rules="Rule.getEmail()"
      :disabled="loading"
      label="Введите Email"
      variant="outlined"
      density="comfortable"
    ></v-text-field>

    <v-text-field
      v-model="data.password"
      :rules="Rule.getPassword()"
      :disabled="loading"
      type="password"
      label="Введите пароль"
      variant="outlined"
      density="comfortable"
    ></v-text-field>

    <v-text-field
      v-model="data.password_confirmation"
      :rules="Rule.getPasswordConfirmation(data.password)"
      :disabled="loading"
      type="password"
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
      >Зарегистрироваться</MyButton
    >
  </v-form>
</template>

<style scoped lang="scss"></style>
