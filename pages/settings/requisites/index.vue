<script script setup lang="ts">
import { VDateInput } from "vuetify/labs/components";
import { Requisites } from "~/composables/useRequisites";
import { DateTime } from "luxon";
import { toast } from "vue3-toastify";

definePageMeta({
  name: "settings-requisites",
  layout: "sidebar",
});
useHead({
  title: "Evollt School | Реквизиты",
});
const insertRequisites = ref(true);
const initialRequisites = ref({
  nalog_status:
    User.store.user?.requisites?.nalog_status ?? Requisites.PHYSICAL,
  date_of_birth: User.store.user?.date_of_birth
    ? new Date(User.store.user?.date_of_birth)
    : (null as Date | null),
  passport: User.store.user?.requisites?.passport ?? "",
  legal_address: User.store.user?.requisites?.legal_address ?? "",
  inn: User.store.user?.requisites?.inn ?? "",
  fio: User.store.user?.requisites?.fio ?? "",
  bik: User.store.user?.requisites?.bik ?? "",
  bank: User.store.user?.requisites?.bank ?? "",
  payment_account: User.store.user?.requisites?.payment_account ?? "",
});
const requisites = ref({
  nalog_status:
    User.store.user?.requisites?.nalog_status ?? Requisites.PHYSICAL,
  date_of_birth: User.store.user?.date_of_birth
    ? new Date(User.store.user?.date_of_birth)
    : (null as Date | null),
  passport: User.store.user?.requisites?.passport ?? "",
  legal_address: User.store.user?.requisites?.legal_address ?? "",
  inn: User.store.user?.requisites?.inn ?? "",
  fio: User.store.user?.requisites?.fio ?? "",
  bik: User.store.user?.requisites?.bik ?? "",
  bank: User.store.user?.requisites?.bank ?? "",
  payment_account: User.store.user?.requisites?.payment_account ?? "",
});
const loading = ref(false);
const selfEmployedDescription = computed(() => {
  return Requisites.NALOG_STATUS_DESCRIPTION[requisites.value.nalog_status];
});
const form = ref(null);

const saveRequisites = async () => {
  if (form.value) {
    // @ts-ignore
    const { valid } = await form.value.validate();

    if (valid) {
      loading.value = true;
      console.log(User.store.user?.date_of_birth);
      User.update({
        _method: "PUT",
        requisites: {
          ...requisites.value,
          date_of_birth: User.store.user?.date_of_birth ?? undefined,
        },
      }).then((response) => {
        if (!response.errors) {
          toast.success("Реквизиты сохранены");
        }
        loading.value = false;
      });
    }
  }
};

const validate = () => {
  if (loading.value) {
    return true;
  }

  return false;
};

const getCompanyByInn = useDebounceFn(async () => {
  if (
    requisites.value.inn.length == 12 ||
    (requisites.value.inn.length == 10 &&
      requisites.value.nalog_status == Requisites.JURIDICAL)
  ) {
    switch (requisites.value.nalog_status) {
      case Requisites.JURIDICAL || Requisites.INDIVIDUAL:
        await Requisites.getCompanyByInn(requisites.value.inn).then(
          (response) => {
            if (response.length > 0) {
              const company = response[0];
              requisites.value = {
                ...requisites.value,
                fio: company.data.management.name,
                legal_address: company.data.address.unrestricted_value,
              };
            } else {
              useErrorNotification({
                message: "Компания с таким ИНН не найдена",
              });
            }
            console.log(response);
          }
        );
    }
  }
}, 800);

const getBankByBik = useDebounceFn(async () => {
  if (requisites.value.bik.length == 9) {
    await Requisites.getBankByBik(requisites.value.bik).then((response) => {
      if (response.length > 0) {
        const company = response[0];
        requisites.value = {
          ...requisites.value,
          bank: company.value,
        };
      } else {
        useErrorNotification({
          message: "Банк с таким БИК не найден",
        });
      }
    });
  }
}, 800);

watch(
  () => requisites.value.nalog_status,
  (value) => {
    requisites.value = {
      ...initialRequisites.value,
      nalog_status: value,
    };
  }
);
</script>

<template>
  <div
    class="requisites mb-5 sidebar-content grid gap-5"
    v-if="User.store.user"
  >
    <h1 class="text-4xl font-bold">Реквизиты</h1>
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
    <h1 class="text-2xl font-bold">Получение средств в РФ</h1>
    <!-- TODO: Переводить на финансовые условия в help.evollt-school -->
    <NuxtLink to="#" class="underline">Финансовые условия</NuxtLink>
    <p>
      Переходя к заполнению реквизитов, вы соглашаетесь с
      <!-- TODO: Переводить на оферту в help.evollt-school -->
      <NuxtLink to="#" class="underline">
        офертой (агентским договором) о продажах курсов в рублях
      </NuxtLink>
      .
    </p>
    <div>
      <div class="flex justify-center" v-if="!insertRequisites">
        <MyButton @click="insertRequisites = true"
          >Заполнить реквизиты</MyButton
        >
      </div>
      <v-form fast-fail ref="form" v-else @submit.prevent>
        <div
          class="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-5"
        >
          <div>
            <v-select
              v-model="requisites.nalog_status"
              :items="Requisites.NALOG_STATUSES"
              rounded="lg"
              item-title="title"
              item-value="id"
              :disabled="loading"
              label="Налоговый статус"
              hide-details="auto"
              variant="outlined"
              density="comfortable"
            ></v-select>
          </div>
          <div>
            <div v-html="selfEmployedDescription" class="text-sm"></div>
          </div>
          <div
            v-if="
              requisites.nalog_status == Requisites.PHYSICAL ||
              requisites.nalog_status == Requisites.SELF_EMPLOYED
            "
          >
            <div class="flex gap-2 items-center">
              <v-date-input
                v-model="requisites.date_of_birth"
                label="Дата рождения"
                :rules="Rule.getRequired()"
                prepend-inner-icon="$calendar"
                :max="new Date()"
                disabled
                prepend-icon=""
                hide-details="auto"
                variant="outlined"
                density="comfortable"
                first-day-of-week="1"
                :value="
                  requisites.date_of_birth
                    ? DateTime.fromJSDate(requisites.date_of_birth).toFormat(
                        'dd.MM.yyyy'
                      )
                    : ''
                "
                rounded="lg"
              >
              </v-date-input>
            </div>
          </div>
          <div
            v-if="
              requisites.nalog_status == Requisites.PHYSICAL ||
              requisites.nalog_status == Requisites.SELF_EMPLOYED
            "
          >
            <v-text-field
              v-model="requisites.passport"
              v-mask="['#### ######']"
              :rules="Rule.getRequired()"
              :disabled="loading"
              rounded="lg"
              hide-details="auto"
              label="Номер и серия паспорта"
              prepend-inner-icon="mdi-account-circle-outline"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </div>
        </div>
        <MyDivider />
        <div
          class="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-5 mb-[20px]"
        >
          <div>
            <v-text-field
              v-model="requisites.inn"
              v-mask="
                requisites.nalog_status == Requisites.JURIDICAL
                  ? ['##########']
                  : ['############']
              "
              :rules="Rule.getInn(requisites.nalog_status)"
              :disabled="loading"
              rounded="lg"
              hide-details="auto"
              prepend-inner-icon="mdi-domain"
              label="ИНН"
              @input="getCompanyByInn()"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              v-model="requisites.fio"
              :rules="Rule.getRequired()"
              :disabled="loading"
              rounded="lg"
              prepend-inner-icon="mdi-account-circle-outline"
              hide-details="auto"
              label="Получатель"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </div>
        </div>
        <div>
          <v-text-field
            v-model="requisites.legal_address"
            :rules="Rule.getRequired()"
            :disabled="loading"
            rounded="lg"
            label="Адрес"
            prepend-inner-icon="mdi-map-marker-outline"
            hide-details="auto"
            variant="outlined"
            density="comfortable"
          ></v-text-field>
        </div>
        <MyDivider />
        <div
          class="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] mb-[20px] gap-5"
        >
          <div>
            <v-text-field
              v-model="requisites.bik"
              :rules="Rule.getRequired()"
              :disabled="loading"
              rounded="lg"
              @input="getBankByBik()"
              v-mask="['#########']"
              hide-details="auto"
              label="БИК банка"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              v-model="requisites.bank"
              :rules="Rule.getRequired()"
              disabled
              rounded="lg"
              label="Наименование банка"
              hide-details="auto"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </div>
        </div>
        <div>
          <v-text-field
            v-model="requisites.payment_account"
            :rules="Rule.getRequired()"
            :disabled="loading"
            rounded="lg"
            v-mask="['####################']"
            hide-details="auto"
            label="Номер расчетного счета"
            variant="outlined"
            class="mb-[20px]"
            density="comfortable"
          ></v-text-field>
        </div>
        <MyButton
          size="large"
          type="submit"
          color="success"
          @click="saveRequisites"
          :disabled="validate()"
          :loading="loading"
          block
        >
          Сохранить изменения
        </MyButton>
      </v-form>
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
