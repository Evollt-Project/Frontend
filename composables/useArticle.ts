import type { IArticleCategory } from "~/types/IArticleCategory";

export class Article {
  static async online() {
    return useRequest<IArticleCategory[]>({
      url: 'api/v1/articles/online'
    }).then(response => {
      return response.data
    }).catch(response => {
      useErrorNotification(
        response.response.data
      );
      return null
    })
  }
}