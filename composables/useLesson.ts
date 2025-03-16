import type {
  ILessonPayloadCreate,
  ILessonPayloadDelete,
  ILessonResponseCreate,
  ILessonResponseDelete,
} from "~/types/Lesson/type";

export class Lesson {
  static async create(params: ILessonPayloadCreate) {
    return await useRequest<ILessonResponseCreate>({
      url: "api/v1/lesson",
      method: "POST",
      body: params,
    }).catch((response) => {
      useErrorNotification(response.response.data.errors);
    });
  }

  static async delete(id: number, params: ILessonPayloadDelete) {
    return await useRequest<ILessonResponseDelete>({
      url: `api/v1/lesson/${id}`,
      method: "DELETE",
      params,
    });
  }
}
