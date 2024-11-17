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

  static getPassword() {
    return [this.required, this.password];
  }

  static getPasswordConfirmation(oldPassword: string) {
    return [
      (value: string) => this.required(value),
      (value: string) => this.passwordConfirmation(value, oldPassword),
    ];
  }

  static getEmail() {
    return [this.required, this.email];
  }

  static getRequired() {
    return [this.required];
  }
}
