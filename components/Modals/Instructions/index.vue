<script lang="ts" setup>
import type { IInstructionPayloadCreate } from "~/types/Instruction/type";

const dialog = shallowRef(false);

const params = ref<IInstructionPayloadCreate>({
  title: "",
  logo: "",
  short_description: "",
  description: "",
});

const emit = defineEmits(["submit"]);

const submitData = (data: IInstructionPayloadCreate) => {
  data ? emit("submit", data) : null;
};
</script>

<template>
  <div class="text-center overflow-hidden">
    <v-dialog v-model="dialog" max-width="1200">
      <template v-slot:activator="{ props: activatorProps }">
        <MyButton size="large" v-bind="activatorProps">
          <div class="flex justify-center items-center gap-2">
            <v-icon icon="mdi-plus"></v-icon>
            <span class="hidden xs:block"> Создать </span>
          </div>
        </MyButton>
      </template>

      <v-card
        rounded="xl"
        class="!bg-white dark:!bg-neutral-900 card-modal"
        variant="elevated"
        density="compact"
      >
        <v-card-title
          class="d-flex justify-between align-center !px-[24px] !py-[10px] !mb-[10px]"
        >
          <div class="text-2xl">Создание инстркции</div>
          <v-btn
            icon="mdi-close"
            variant="text"
            class="dark:text-white"
            :ripple="false"
            @click="dialog = false"
          ></v-btn>
        </v-card-title>
        <v-card-text class="!p-[16px 24px]">
          <div class="flex flex-col gap-5">
            <div>
              <v-text-field
                hide-details="auto"
                rounded="lg"
                label="Название"
                :rules="Rule.getRequired()"
                variant="outlined"
                v-model="params.title"
              />
            </div>
            <div>
              <v-text-field
                hide-details="auto"
                rounded="lg"
                label="Картинка"
                :rules="Rule.getRequired()"
                variant="outlined"
                v-model="params.logo"
              />
            </div>
            <div>
              <v-text-field
                hide-details="auto"
                rounded="lg"
                label="Короткое описание"
                :rules="Rule.getRequired()"
                variant="outlined"
                v-model="params.short_description"
              />
            </div>
            <div>
              <MyMdEditor
                :text="params.description"
                @update:text="params.description = $event"
              />
            </div>
          </div>
        </v-card-text>

        <v-divider></v-divider>
        <div class="px-[16px]">
          <v-card-actions>
            <v-spacer></v-spacer>
            <MyButton
              size="large"
              @click="
                () => {
                  dialog = false;
                }
              "
              color="danger"
            >
              <div class="flex justify-center items-center gap-2">
                <!--              <v-icon icon="mdi-plus"></v-icon>-->
                <span class="hidden xs:block"> Закрыть </span>
              </div>
            </MyButton>
            <MyButton
              size="large"
              @click="
                () => {
                  submitData(params);
                  dialog = false;
                }
              "
              color="success"
            >
              <div class="flex justify-center items-center gap-2">
                <!--              <v-icon icon="mdi-plus"></v-icon>-->
                <span class="hidden xs:block"> Сохранить </span>
              </div>
            </MyButton>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
