<script setup lang="ts">
import { toast } from "vue3-toastify";
import type {
  ICertificateType,
  ICertificateTypePosition,
} from "~/types/ICertificate";

definePageMeta({
  name: "certificates-create",
  layout: "sidebar",
});

export interface ICertificateTypeSummary
  extends Pick<ICertificateType, "title" | "positions"> {
  path: File | null;
}

const certificateType: Ref<ICertificateTypeSummary> = ref({
  path: null,
  title: "",
  positions: [
    {
      x: 60,
      y: 20,
      type: "logo",
      color: "#FFFFFF",
      size: 30,
    },
    {
      x: 420,
      y: 20,
      type: "title",
      color: "#FFFFFF",
      size: 20,
    },
    {
      x: 540,
      y: 20,
      type: "date",
      color: "#FFFFFF",
      size: 15,
    },
  ],
});
const isFormValid = ref(true);
const loading = ref(false);
const router = useRouter();

const getLabelName = (position: ICertificateTypePosition) => {
  let label = "Размер шрифта для ";
  if (position.type == "logo") {
    label += "логотипа";
  } else if (position.type == "title") {
    label += "ФИО студента";
  } else if (position.type == "date") {
    label += "даты";
  }
  return label;
};
const isCanSave = () => {
  if (isFormValid.value && certificateType.value.path && !loading.value) {
    return false;
  }

  return true;
};

const findPosition = (type: ICertificateTypePosition["type"]) => {
  return certificateType.value.positions.find((item) => item.type == type);
};

const createCertificateLayout = async () => {
  loading.value = true;
  const data = new FormData();
  if (certificateType.value.path) {
    data.append("path", certificateType.value.path);
  }
  data.append("title", certificateType.value.title);
  data.append("title_position", JSON.stringify(findPosition("title")));
  data.append("date_position", JSON.stringify(findPosition("date")));
  data.append("logo_position", JSON.stringify(findPosition("logo")));
  Certificate.createLayout(data).then((response) => {
    toast.success(
      "Шаблон для сертификата создан. Вы можете его привязать при создании или редактировании вашего курса"
    );
    loading.value = false;
    router.push({
      name: "certificates-my",
      query: {
        tab: "layouts",
      },
    });
  });
};
</script>

<template>
  <div class="max-w-[1000px]">
    <v-form
      v-model="isFormValid"
      :disabled="loading"
      @submit.prevent
      class="grid gap-5"
    >
      <v-text-field
        hide-details="auto"
        v-model="certificateType.title"
        rounded="lg"
        label="Название шаблона для сертификата"
        :loading="loading"
        :rules="Rule.getRequired()"
        variant="outlined"
        density="comfortable"
      ></v-text-field>
      <div class="grid gap-5 grid-cols-2">
        <div
          class="flex items-center gap-4"
          v-for="position in certificateType.positions"
        >
          <v-text-field
            hide-details="auto"
            v-model="position.size"
            rounded="lg"
            :rules="[Rule.required, Rule.min(position.size, 15)]"
            :loading="loading"
            type="number"
            :label="getLabelName(position)"
            variant="outlined"
            density="comfortable"
          ></v-text-field>
          <CertificateColorPicker
            :color="position.color"
            @color="(e: string) => position.color = e"
          />
        </div>
      </div>
      <CertificateLayoutCreateAndEdit
        :blocks="certificateType.positions"
        :path="certificateType.path"
        @path="(e: File) => (certificateType.path = e)"
      />
      <MyButton
        :disabled="isCanSave()"
        :loading="loading"
        @click="createCertificateLayout"
        color="success"
        >Создать шаблон</MyButton
      >
    </v-form>
  </div>
</template>

<style scoped lang="scss"></style>
