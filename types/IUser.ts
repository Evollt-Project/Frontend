import type { IRequisite } from "./IRequisite";

export interface IUser {
  id: number;
  first_name: string;
  surname: string | null;
  role: 1 | 3 | 7 | 15;
  city: string;
  skills: ISkill[];
  job?: string;
  gender?: number;
  requisites: IRequisite;
  description?: string;
  privacy: boolean;
  balance: number;
  telegram?: string;
  vk?: string;
  github?: string;
  mail_approve: boolean;
  avatar: string | null;
  email: string;
  phone: string;
  date_of_birth: string | null;
  updated_at: string;
  created_at: string;
  token?: string;
}

export interface ISkill {
  id: number;
  title: string;
  description?: string;
}
