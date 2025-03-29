import type { IArticle } from "./IArticle";

type ArticleId = number;

export interface IArticlePayloadBase {}
export interface IArticleResponseBase {}

export interface IArticlePayloadCreate extends IArticlePayloadBase {
  title: string;
}
export interface IArticleResponseCreate extends IArticle {}

export interface IArticlePayloadEdit extends IArticlePayloadBase {
  id: ArticleId;
  title?: string;
  avatar?: string;
  description?: string;
  content?: string;
}
export interface IArticleResponseEdit extends IArticle {}

export interface IArticlePayloadGet extends IArticlePayloadBase {
  id: ArticleId;
}
export interface IArticleResponseGet extends IArticle {}
