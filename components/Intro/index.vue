<script setup lang="ts">
const loading: Ref<boolean> = ref(false);
const search = ref({
  field: "",
  certificates: false,
  free: false,
});

const searchCourses = () => {};

const validate = () => {
  if (loading.value) {
    return true;
  }

  return false;
};
</script>

<template>
  <div class="intro rounded-3xl">
    <div class="intro-content">
      <div class="intro-content__top mb-[-100px]">
        <img
          src="@/assets/img/intro/background.webp"
          class="intro__background object-cover rounded-3xl w-full h-96"
          alt=""
        />
      </div>
      <div
        class="intro-content__bottom min-h-36 dark:bg-neutral-900 bg-neutral-100 rounded-3xl p-8 relative flex items-center shadow-custom"
      >
        <div class="w-full">
          <form
            @submit.prevent
            class="flex justify-between gap-[20px] items-center"
          >
            <v-text-field
              v-model="search.field"
              :disabled="loading"
              hide-details
              rounded="lg"
              label="Поиск"
              prepend-inner-icon="mdi-text-box-search"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
            <v-checkbox
              v-model="search.certificates"
              hide-details
              label="С сертификатами"
            ></v-checkbox>
            <v-checkbox
              v-model="search.free"
              hide-details
              label="Бесплатные"
            ></v-checkbox>

            <MyButton
              size="large"
              type="submit"
              @click="searchCourses"
              hide-details
              :disabled="validate()"
              :loading="loading"
            >
              Искать
            </MyButton>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
