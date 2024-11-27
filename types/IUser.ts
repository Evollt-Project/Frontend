export interface IUser {
  id: number;
  first_name: string;
  surname: string | null;
  last_name: string | null;
  balance: number;
  mail_approve: boolean;
  avatar: string | null;
  email: string;
  phone: string;
  date_of_birth: string | null;
  updated_at: string;
  created_at: string;
  token?: string;
}
