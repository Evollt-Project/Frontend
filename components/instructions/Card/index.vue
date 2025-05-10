<script setup lang="ts">
import { toast } from "vue3-toastify";

const { type, instruction } = defineProps<{
  instruction: {
    id: number;
    title: string;
    logo: string;
    short_description: string;
    description: string;
  };
  type: "subinstruction" | "instruction";
}>();
const emits = defineEmits(["update:instructions"]);
const editInstructionModal = ref(false);
const editSubinstructionModal = ref(false);
const route = useRoute();
const loading = ref(false);
const deleteInstructionModal = ref(false);
const instructionId = ref(
  route.query["instruction_id"]
    ? Number(route.query["instruction_id"])
    : undefined,
);

const handleClick = () => {
  if (type === "instruction") {
    editInstructionModal.value = true;
  } else {
    editSubinstructionModal.value = true;
  }
};

const toLink = computed(() => {
  switch (type) {
    case "instruction":
      return {
        name: "support-subinstructions",
        query: {
          instruction_id: instruction.id,
        },
      };

    case "subinstruction":
      return {
        name: "support-subinstruction",
        params: {
          id: instruction.id,
        },
      };
  }
});

const deleteInstruction = async () => {
  if (type === "instruction") {
    await Instruction.delete({ id: instruction.id }).then(() => {
      toast.success("Инструкция удалена");
    });
  } else {
    await Subinstruction.delete({ id: instruction.id }).then(() => {
      toast.success("Подинструкция удалена");
    });
  }

  emits("update:instructions");
  deleteInstructionModal.value = false;
};
</script>

<template>
  <NuxtLink :to="toLink">
    <div
      class="relative rounded-2xl w-full h-[230px] hover:cursor-pointer bg-[#F5F5F5] duration-500 hover:scale-[101%] dark:bg-[#171717] hover:shadow-[0_0_5px_0_#000000] hover:dark:shadow-[0_0_5px_0_#FFFFFF]"
    >
      <div class="flex justify-between px-[20px] py-[30px] sm:p-[40px] h-full">
        <div class="flex flex-col gap-[25px]">
          <div class="font-bold">
            {{ instruction.title }}
          </div>
          <div class="font-semibold">
            {{ instruction.short_description }}
          </div>
        </div>
        <div>
          <v-icon size="50px" :icon="instruction.logo" />
        </div>
      </div>
      <div class="absolute right-[35px] bottom-[20px]">
        <div class="flex items-center gap-5">
          <div
            v-if="User.hasPermission(User.ADMIN)"
            @click.prevent="deleteInstructionModal = true"
          >
            <v-icon icon="mdi-delete-outline" />
          </div>
          <div
            v-if="User.hasPermission(User.ADMIN)"
            @click.prevent="handleClick"
          >
            <v-icon icon="mdi-pencil" />
          </div>
          <div>
            Подробнее
            <v-icon icon="mdi-chevron-right" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
  <ModalsConfirmAction
    :dialog="deleteInstructionModal"
    :loading="loading"
    @action="deleteInstruction"
    @dialog="deleteInstructionModal = $event"
  >
    <template #content>
      Вы уверены, что хотите удалить <strong>{{ instruction.title }}</strong>
    </template>
  </ModalsConfirmAction>

  <ModalsInstruction
    v-if="editInstructionModal"
    :dialog="editInstructionModal"
    :instruction="instruction"
    @update:dialog="editInstructionModal = $event"
  />
  <ModalsSubinstruction
    v-if="editSubinstructionModal"
    :dialog="editSubinstructionModal"
    :subinstruction="instruction"
    :instruction-id="instructionId"
    @update:dialog="editSubinstructionModal = $event"
  />
</template>
