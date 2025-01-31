import type { IUser } from "./IUser";

export interface IArticle {
  id: number;
  title: string;
  owner: IUser;
  avatar: string;
  students: IUser[];
  teachers: IUser[];
  has_certificate: boolean;
  time: string;
  rate: string;
  price: number;
}
