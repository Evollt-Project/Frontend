export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  first_name: string;
  surname?: string | undefined;
  email: string;
  phone: string | undefined;
  date_of_birth?: string | undefined;
  password: string;
  password_confirmation: string | undefined;
  code: string;
}
