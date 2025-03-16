import type { ILesson } from "../Lesson/ILesson";

export interface IModule {
  id: number;
  title: string;
  opened_date: string;
  description: string;
  lessons: ILesson[];
  status: boolean;
  created_at: string;
}