import type { IArticle } from "./IArticle";
import type { IUser } from "./IUser";

export interface ICertificateType {
  id: number;
  path: string;
  owner: IUser;
  title: string;
  positions: ICertificateTypePosition[];
  state: number;
  created_at: string;
  updated_at: string;
}

export interface ICertificateTypePosition {
  x: number;
  y: number;
  type: 'logo' | 'title' | 'date';
  width: number;
  size: number;
  height: number;
}
export interface ICertificate {
  id: number;
  path: string;
  user: IUser;
  article: IArticle;
  created_at: string;
  updated_at: string;
}