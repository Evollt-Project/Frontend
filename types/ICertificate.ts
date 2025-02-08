import type { IArticle } from "./IArticle";
import type { IUser } from "./IUser";

export interface ICertificateType {
  id: number;
  path: string;
  preview_image: string
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
  color: string;
  size: number;
}
export interface ICertificate {
  id: number;
  path: string;
  user: IUser;
  article: IArticle;
  created_at: string;
  updated_at: string;
}