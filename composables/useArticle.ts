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
  static readonly BASE_URL = "api/v1/article";

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

  static async edit({ id, ...payload }: IArticlePayloadEdit) {
    return useRequest<IArticleResponseEdit>({
      url: this.BASE_URL + "/" + id,
      method: "POST",
      body: {
        _method: "PUT",
        ...payload,
      },
    });
  }
}
