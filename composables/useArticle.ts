import type {
  ArticleId,
  IArticlePayloadCreate,
  IArticlePayloadEdit,
  IArticlePayloadGet,
  IArticleResponseCreate,
  IArticleResponseEdit,
  IArticleResponseGet,
  ITeachingCoursePayload,
  ITeachingCourseResponse,
} from "~/types/Article/type";
import type { IArticle } from "~/types/Article/IArticle";
import type { IPagination } from "~/types/Base/IPagination";

export class Article {
  static readonly BASE_URL = "api/v1/article";

  static async teaching(payload: ITeachingCoursePayload) {
    return await useRequest<ITeachingCourseResponse>({
      url: "api/v1/articles/teaching",
      params: payload,
    }).then((response) => {
      return response.data;
    });
  }

  static async getAll(params: object) {
    return useRequest<IPagination<IArticle>>({
      url: this.BASE_URL,
      params: params,
    }).then((response) => {
      return response.data;
    });
  }

  static async create(params: IArticlePayloadCreate) {
    return useRequest<IArticleResponseCreate>({
      url: this.BASE_URL,
      method: "POST",
      body: params,
    });
  }

  static async get({ id, ...payload }: IArticlePayloadGet) {
    return useRequest<IArticleResponseGet>({
      url: this.BASE_URL + "/" + id,
      params: payload,
    }).catch((response) => {
      useErrorNotification(response.response.data);
      return null;
    });
  }

  static async edit(id: ArticleId, payload: IArticlePayloadEdit) {
    const formData = useFormatToFormData(payload); // генерируем formData из payload
    formData.append("_method", "PUT"); // добавляем метод

    return useRequest<IArticleResponseEdit>({
      url: this.BASE_URL + "/" + id,
      method: "POST",
      body: formData,
    });
  }
}
