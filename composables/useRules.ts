import { Requisites } from "./useRequisites";

export class Rule {
  private static email = (value: string) =>
    !value ||
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    "Почта должна иметь валидную форму";

  private static required = (value: string) =>
    !!value || "Это поле обязательно для заполнения";

  private static password = (value: string) =>
    (value && value.length >= 8) || "Пароль должен содержать не менее 8 букв";

  private static passwordConfirmation = (value: string, oldPassword: string) =>
    value == oldPassword || "Пароли должны совпадать";
  private static telegramLink = (value: string) =>
    !value.trim() || /^https:\/\/t\.me\/[^\s]+$/.test(value) || "Ссылка должна иметь протокол https и ссылаться на t.me, также ник не должен содержать пробелы";
  private static vkLink = (value: string) =>
    !value.trim() || /^https:\/\/vk\.com\/[^\s]+$/.test(value) || "Ссылка должна иметь протокол https и ссылаться на vk.com, также ник не должен содержать пробелы";
  private static githubLink = (value: string) =>
    !value.trim() || /^https:\/\/github\.com\/[^\s]+$/.test(value) || "Ссылка должна иметь протокол https и ссылаться на github.com, также ник не должен содержать пробелы";
  private static inn = (value: string, nalog_status: number) => {
    if (value.length < 10 && nalog_status == Requisites.JURIDICAL) {
      return "Поле ИНН должно содержать 10 символов"
    }
    if (value.length < 12 && nalog_status != Requisites.JURIDICAL) {
      return "Поле ИНН должно содержать 12 символов"
    }

    return true
  }

  static getPassword() {
    return [this.required, this.password];
  }

  static getPasswordConfirmation(oldPassword: string) {
    return [
      (value: string) => this.required(value),
      (value: string) => this.passwordConfirmation(value, oldPassword),
    ];
  }
  static getInn(nalog_status: number) {
    return [
      (value: string) => this.required(value),
      (value: string) => this.inn(value, nalog_status),
    ];
  }

  static getEmail() {
    return [this.required, this.email];
  }

  static getRequired() {
    return [this.required];
  }

  static getTelegramLink() {
    return [this.telegramLink]
  }
  static getVkLink() {
    return [this.vkLink]
  }
  static getGithubLink() {
    return [this.githubLink]
  }
}
