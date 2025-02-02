import type { IArticle } from "./IArticle";
import type { IUser } from "./IUser";

export interface ICertificateType {
  id: number;
  path: string;
  user: IUser;
  title_position: string;
  date_position: string;
  logo_position: string;
  state: number;
  created_at: string;
  updated_at: string;
}
export interface ICertificate {
  id: number;
  path: string;
  user: IUser;
  article: IArticle;
  created_at: string;
  updated_at: string;
}