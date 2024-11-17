<script setup lang="ts">
const props = defineProps<{
  loading: boolean;
}>();
const data = ref({
  email: "",
  password: "",
});
const form = ref(null);

const login = async () => {
  // @ts-ignore
  const { valid } = await form.value.validate();

  if (valid) {
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
