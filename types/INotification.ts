import type { IArticle } from "./IArticle";

export interface INotification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  type: string;
  course: IArticle | null;
  is_favorite: boolean;
  created_at: string;
  updated_at: string | null;
}
