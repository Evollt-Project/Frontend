import type { LessonId } from "./type";

export interface ILesson {
  id: LessonId;
  title: string;
  content: string;
  created_at: string;
}
