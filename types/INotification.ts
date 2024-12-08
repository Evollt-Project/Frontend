export interface INotification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  type: string;
  is_favorite: boolean;
  created_at: string;
  updated_at: string | null;
}
