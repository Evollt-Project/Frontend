import type { IArticle } from "./IArticle";

export interface IArticleCategory {
  tab: string;
  articles: IArticle[];
}
