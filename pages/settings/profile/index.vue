<script setup lang="ts">
import { DateTime } from "luxon";
import { VDateInput } from "vuetify/labs/components";
import { toast } from "vue3-toastify";
import type { ISkill } from "~/types/IUser";

definePageMeta({
  name: "settings-profile",
  layout: "sidebar",
});
const loading = ref(false);
const skills: Ref<ISkill[]> = ref([]);
const gender = ref([
  { id: 1, title: "Мужской" },
  { id: 2, title: "Женский" },
]);
const data = ref({
  first_name: User.store.user?.first_name ?? "",
  surname: User.store.user?.surname ?? "",
  city: User.store.user?.city ?? "",
  skill_ids: User.store.user?.skills.map((item) => item.id) ?? [],
  job: User.store.user?.job ?? "",
  date_of_birth: User.store.user?.date_of_birth
    ? new Date(User.store.user?.date_of_birth)
    : (null as Date | null),
  gender: User.store.user?.gender ?? null,
  description: User.store.user?.description ?? "",
  privacy: User.store.user?.privacy ?? false,
  avatar: User.store.user?.avatar ?? ("" as string | File),
});
const previewImage: Ref<string | null> = ref(null);
const form = ref(null);

onMounted(async () => {
  await User.skills().then((response) => {
    skills.value = response.data;
  });
});
const saveProfile = async () => {
  if (form.value) {
    // @ts-ignore
    const { valid } = await form.value.validate();

    if (valid) {
      loading.value = true;
      const formData = new FormData();
      formData.append("_method", "PUT");
      Object.keys(data.value).forEach((key) => {
        const typedKey = key as keyof typeof data.value;
        let value = data.value[typedKey];
        if (typeof value == "boolean") {
          value = value ? 1 : 0;
        } else if (value instanceof Date) {
          value = DateTime.fromJSDate(value).toFormat("yyyy-MM-dd");
        }
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
      await User.update(formData).then((response) => {
        toast.success("Отредактировано");
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

const fileInput: Ref<HTMLInputElement | null> = ref(null);
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    previewImage.value = URL.createObjectURL(file);
    data.value.avatar = file;
  }
};
</script>

<template>
  <div class="settings sidebar-content" v-if="User.store.user">
    <h1 class="text-4xl font-bold mb-4">Редактирование профиля</h1>
    <div>
      <v-form fast-fail ref="form" class="mt-4 grid gap-5" @submit.prevent>
        <div class="grid grid-cols-2 gap-5">
          <div class="flex items-center gap-5">
            <v-avatar size="100" v-if="previewImage" :image="previewImage" />
            <v-avatar
              v-else
              size="100"
              :image="
                User.store.userPhotoUrl(
                  data.avatar as string,
                  User.store.user.first_name
                )
              "
            />
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="handleFileChange"
              style="display: none"
            />

            <MyButton
              :disabled="loading"
              size="large"
              @click="triggerFileInput"
            >
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
            v-model="data.job"
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
            :disabled="loading"
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
        <div class="grid grid-cols-2 gap-5">
          <v-select
            v-model="data.skill_ids"
            :items="skills"
            rounded="lg"
            item-title="title"
            item-value="id"
            hide-details
            label="Умения"
            multiple
            :disabled="loading"
            prepend-inner-icon="mdi-certificate-outline"
            variant="outlined"
            density="comfortable"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip>
                <span>{{ item.title }}</span>
              </v-chip>
            </template>
          </v-select>
          <v-date-input
            v-model="data.date_of_birth"
            label="Дата рождения"
            :rules="Rule.getRequired()"
            prepend-inner-icon="$calendar"
            :max="new Date()"
            prepend-icon=""
            :disabled="loading"
            variant="outlined"
            density="comfortable"
            first-day-of-week="1"
            hide-details
            :value="
              data.date_of_birth
                ? DateTime.fromJSDate(data.date_of_birth).toFormat('dd.MM.yyyy')
                : ''
            "
            rounded="lg"
          ></v-date-input>
        </div>
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
          color="success"
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
