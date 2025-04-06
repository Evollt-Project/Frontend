<script setup lang="ts">
import type { IRegister } from "~/types/Auth";

const props = defineProps<{
  loading: boolean;
}>();
const emits = defineEmits(["loading", "dialog"]);
const data: Ref<IRegister> = ref({
  first_name: "Evollt",
  email: "evollt@gmail.com",
  phone: "",
  password: "qwerty12!",
  password_confirmation: "qwerty12!",
});
const showPassword: Ref<boolean> = ref(false);
const showConfirmationPassword: Ref<boolean> = ref(false);
const isFormValid = ref(false);

const register = async () => {
  emits("loading", true);
  await User.register({
    ...data.value,
    phone: usePhoneFormat(data.value.phone),
  });
  emits("loading", false);
};

const validate = computed(() => {
  return props.loading || !isFormValid.value;
});
</script>

<template>
  <v-form
    v-model="isFormValid"
    fast-fail
    class="mt-4 grid gap-5"
    @submit.prevent
  >
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
      v-model="data.phone"
      v-mask="['+7 (###) ### ##-##']"
      :rules="[Rule.required, Rule.phone]"
      :disabled="loading"
      rounded="lg"
      label="+7 (999) 999 99-99"
      hide-details="auto"
      prepend-inner-icon="mdi-phone-outline"
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
      :disabled="validate"
      :loading="loading"
      block
    >
      Зарегистрироваться
    </MyButton>
  </v-form>
</template>

<style scoped lang="scss"></style>
