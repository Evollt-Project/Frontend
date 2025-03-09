import type { IArticle } from "./Article/IArticle";

export interface IArticleCategory {
  tab: string;
  articles: IArticle[];
}
