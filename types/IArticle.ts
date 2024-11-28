import type { IUser } from "./IUser";

export interface IArticle {
  id: number;
  title: string;
  author: IUser | null;
  photo: string;
  students_complete: string;
  time: string;
  rate: string;
  price: number;
}
