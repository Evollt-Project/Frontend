<script setup lang="ts">
import type { IRegister } from "~/types/Auth";
import { toast } from "vue3-toastify";
import type { Timeout } from "unenv/node/internal/timers/timeout";

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
  code: "",
});
const cooldown = ref(0);
let timer: Timeout | null = null;
type TabTypes = "register" | "confirm-phone" | "email-message";
const showPassword: Ref<boolean> = ref(false);
const showConfirmationPassword: Ref<boolean> = ref(false);
const isFormValid = ref(false);
const isCodeConfirmFormValid = ref(false);
const tab: Ref<TabTypes> = ref("register");
const hasError = ref(false);

const register = async () => {
  const formattedPhone = usePhoneFormat(data.value!.phone);
  emits("loading", true);
  await User.checkCode({
    phone: formattedPhone,
    code: data.value.code,
  }).then((response) => {
    if (!response.data.status) {
      hasError.value = true;
      return;
    }

    User.register({
      ...data.value,
      phone: formattedPhone,
    });

    tab.value = "email-message";
  });

  emits("loading", false);
};

const sendCode = async () => {
  emits("loading", true);
  await User.checkEmailExists({
    email: data.value.email,
  }).then((response) => {
    if (response.data.exists) {
      toast.error(`Почта ${data.value.email} уже зарегистрирована в системе`);
      return;
    }

    User.sendCode({
      phone: usePhoneFormat(data.value!.phone),
    });
    startCooldown(30);
    tab.value = "confirm-phone";
  });

  emits("loading", false);
};

const validateRegister = computed(() => {
  return props.loading || !isFormValid.value;
});

const validateCodeCheck = computed(() => {
  return props.loading || !isCodeConfirmFormValid.value;
});

const startCooldown = (seconds: number) => {
  cooldown.value = seconds;
  timer = setInterval(() => {
    cooldown.value--;
    if (cooldown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};
</script>

<template>
  <v-window v-model="tab">
    <v-window-item value="register">
      <v-form
        v-model="isFormValid"
        fast-fail
        class="grid gap-5 mt-4"
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
        />

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
        />

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
        />

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
        />

        <v-text-field
          v-model="data.password_confirmation"
          :rules="Rule.getPasswordConfirmation(data.password)"
          :disabled="loading"
          rounded="lg"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="
            showConfirmationPassword ? 'mdi-eye-off' : 'mdi-eye'
          "
          :type="showConfirmationPassword ? 'text' : 'password'"
          @click:append-inner="
            showConfirmationPassword = !showConfirmationPassword
          "
          hide-details="auto"
          label="Подтвердите пароль"
          variant="outlined"
          density="comfortable"
        />

        <MyButton
          class="mt-4"
          size="large"
          type="submit"
          @click="sendCode"
          :disabled="validateRegister"
          :loading="loading"
          block
        >
          Зарегистрироваться
        </MyButton>
      </v-form>
    </v-window-item>
    <v-window-item value="confirm-phone">
      <v-form
        v-model="isCodeConfirmFormValid"
        fast-fail
        class="grid gap-5 mt-4"
        @submit.prevent
      >
        <div>
          <v-otp-input
            v-model="data.code"
            placeholder="1"
            :disabled="loading"
            rounded="lg"
            :error="hasError"
            :error-messages="'weojfowef'"
            @finish="register"
          />
          <div v-if="hasError" class="text-red-600 text-center">
            Проверьте, пожалуйста, введенный код и название вашей почты
          </div>
        </div>

        <MyButton
          class="mt-4"
          size="large"
          type="submit"
          @click="register"
          :disabled="validateCodeCheck"
          :loading="loading"
          block
        >
          Подтвердить
        </MyButton>

        <MyButton
          class="mt-4"
          theme="plain"
          variant="plain"
          size="large"
          :disabled="cooldown > 0"
          @click="sendCode"
          :loading="loading"
          block
        >
          {{
            cooldown > 0
              ? `Отправить повторно через ${cooldown}с`
              : "Отправить код повторно"
          }}
        </MyButton>
      </v-form>
    </v-window-item>
    <v-window-item value="email-message">
      <div class="grid gap-5">
        <p>
          Пользователь с адресом электронной почты
          <strong>{{ data.email }}</strong> был успешно зарегистрирован в
          системе.
        </p>
        <p>
          Чтобы активировать аккаунт и получить доступ к системе, пожалуйста,
          подтвердите свой адрес электронной почты. Для этого перейдите по
          ссылке, отправленной на вашу почту.
        </p>
        <p
          >Если письмо не пришло в течение нескольких минут, проверьте папку
          «Спам» или «Промоакции». При необходимости вы можете запросить
          повторную отправку письма.</p
        >
        <p> Благодарим за регистрацию! </p>
      </div>
    </v-window-item>
  </v-window>
</template>

<style scoped lang="scss"></style>
