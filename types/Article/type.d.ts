import type { IArticle } from "./IArticle";

export interface IArticlePayloadBase { }
export interface IArticleResponseBase { }

export interface IArticlePayloadCreate extends IArticlePayloadBase {
  title: string;
}
export interface IArticleResponseCreate extends IArticle { }