<script setup lang="ts">
const props = defineProps<{
  drawer: boolean;
}>();
const emits = defineEmits(["drawer"]);
const drawer: Ref<boolean> = ref(props.drawer);
const data = ref({
  telegram: "" as string,
  github: "" as string,
});

watch(drawer, (value) => {
  emits("drawer", value);
});

watch(
  () => props.drawer,
  (value) => {
    drawer.value = value;
  }
);

const isCanSaveTelegram = () => {
  if (
    data.value.telegram.trim().length > 0 &&
    /^@[^\s]*$/.test(data.value.telegram)
  ) {
    return false;
  }

  return true;
};
const isCanSaveGithub = () => {
  if (
    data.value.github.trim().length > 0 &&
    /^https:\/\/github\.com\/[^\s]+$/.test(data.value.github)
  ) {
    return false;
  }

  return true;
};
</script>

<template>
  <v-layout v-if="User.store.user">
    <v-navigation-drawer
      class="!bg-white dark:!bg-background text-black dark:!text-white border-l-white p-5"
      style="--v-border-color: 81, 81, 81"
      v-model="drawer"
      width="500"
      location="right"
      permanent
    >
      <template v-slot:prepend>
        <v-btn
          icon="mdi-close"
          variant="text"
          class="dark:text-white mb-4"
          :ripple="false"
          @click="drawer = false"
        ></v-btn>
      </template>
      <div>
        <div class="grid gap-4">
          <h3 class="font-bold text-2xl flex items-center gap-3">
            <v-icon icon="mdi-account-outline"></v-icon> Аккаунт
          </h3>
          <div class="text-lg">
            Email:
            <span class="text-neutral-500">{{ User.store.user.email }}</span>
          </div>
          <div>
            <MyButton block> Сбросить пароль </MyButton>
          </div>
        </div>
      </div>
      <MyDivider />
      <div>
        <div class="grid gap-4">
          <h3 class="font-bold text-2xl flex items-center gap-3">
            <IconsTelegram /> Телеграм
          </h3>
          <div class="text-lg">
            <v-text-field
              v-model="data.telegram"
              :rules="Rule.getTelegramNik()"
              rounded="lg"
              label="@username"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </div>
          <div>
            <MyButton block :disabled="isCanSaveTelegram()">
              Сохранить
            </MyButton>
          </div>
        </div>
      </div>
      <MyDivider />
      <div>
        <div class="grid gap-4">
          <h3 class="font-bold text-2xl flex items-center gap-3">
            <v-icon icon="mdi-github"></v-icon> Аккаунт Github
          </h3>
          <div class="text-lg">
            <v-text-field
              v-model="data.github"
              :rules="Rule.getGithubLink()"
              rounded="lg"
              label="https://github.com/username"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </div>
          <div>
            <MyButton block :disabled="isCanSaveGithub()"> Сохранить </MyButton>
          </div>
        </div>
      </div>
    </v-navigation-drawer>
  </v-layout>
</template>

<style scoped lang="scss"></style>
