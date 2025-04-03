import type {
  IArticlePayloadCreate,
  IArticlePayloadEdit,
  IArticlePayloadGet,
  IArticleResponseCreate,
  IArticleResponseEdit,
  IArticleResponseGet,
} from "~/types/Article/type";
import type { IArticle } from "~/types/Article/IArticle";
import type { IArticleCategory } from "~/types/IArticleCategory";
import type { IPagination } from "~/types/Base/IPagination";

export class Article {
  static async online() {
    return useRequest<IArticleCategory[]>({
      url: "api/v1/articles/online",
    }).then((response) => {
      return response.data;
    });
  }
  static async big() {
    return useRequest<IArticleCategory[]>({
      url: "api/v1/articles/big",
    }).then((response) => {
      return response.data;
    });
  }
  static async getAll(params: object) {
    return useRequest<IPagination<IArticle>>({
      url: "api/v1/article",
      params: params,
    }).then((response) => {
      return response.data;
    });
  }

  static async create(params: IArticlePayloadCreate) {
    return useRequest<IArticleResponseCreate>({
      url: "api/v1/article",
      method: "POST",
      body: params,
    });
  }

  static async get({ id, ...payload }: IArticlePayloadGet) {
    return useRequest<IArticleResponseGet>({
      url: `api/v1/article/${id}`,
      params: payload,
    }).catch((response) => {
      useErrorNotification(response.response.data);
      return null;
    });
  }

  static async edit({ id, ...payload }: IArticlePayloadEdit) {
    return useRequest<IArticleResponseEdit>({
      url: `api/v1/article/${id}`,
      method: "POST",
      body: {
        _method: "PUT",
        ...payload,
      },
    });
  }
}
