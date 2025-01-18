<script setup lang="ts">
definePageMeta({
  name: "settings-requisites",
  layout: "sidebar",
});
</script>

<template>
  <div class="requisites sidebar-content" v-if="User.store.user">
    <h1 class="text-4xl font-bold mb-4">Реквизиты</h1>
    <div class="requisites-email">
      <div class="mr-5 requisites-email__title mt-[10px]">
        Контактный e-mail
      </div>
      <div class="flex items-center gap-3">
        <v-text-field
          disabled
          rounded="lg"
          label="Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          density="comfortable"
          hide-details
          v-model="User.store.user.email"
        >
        </v-text-field>
        <Support>
          Для связи с вами мы используем основной email вашего аккаунта, который
          можно изменить в профиле
        </Support>
      </div>
      <div class="text-neutral-400 dark:text-neutral-600">
        Для отправки платежных документов
      </div>
    </div>
    <!-- TODO: Доделать страницу реквизитов -->
  </div>
</template>

<style scoped lang="scss">
.requisites {
  &-email {
    display: grid;
    grid-template-columns: auto 1fr;
    &__title {
      grid-column: 1;
      grid-row: 1 / span 100;
    }
  }
}
</style>
