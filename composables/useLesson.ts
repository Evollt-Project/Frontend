import type {
  ILessonPayloadCreate,
  ILessonPayloadDelete,
  ILessonPayloadReorder,
  ILessonResponseCreate,
  ILessonResponseDelete,
  ILessonResponseReorder,
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

  static async reorder(params: ILessonPayloadReorder) {
    return await useRequest<ILessonResponseReorder>({
      url: "api/v1/lesson/reorder",
      method: "POST",
      body: {
        _method: "PUT",
        ...params,
      },
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
