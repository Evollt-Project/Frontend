import type { ILesson } from "./ILesson";

export type LessonId = number;

export interface ILessonPayloadBase {}
export interface ILessonResponseBase extends ILesson {}

export interface ILessonPayloadCreate extends ILessonPayloadBase {
  title: string;
  module_id: number;
}
export interface ILessonResponseCreate extends ILessonResponseBase {}

// export interface IModulePayloadGet extends IModulePayloadBase {
//   article_id: number;
// }
// export interface IModuleResponseGet extends IModuleResponseBase, IModule { }

export interface ILessonPayloadDelete extends IModulePayloadBase {}
export interface ILessonResponseDelete extends IModuleResponseBase {}

export interface ILessonPayloadReorder extends ILessonPayloadBase {
  lesson_ids: LessonId[];
}
export interface ILessonResponseReorder extends ILessonResponseBase {}
