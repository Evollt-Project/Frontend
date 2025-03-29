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
  description?: string; // описание
  short_description?: string; // короткое описание
  what_learn_description?: string; // чему вы научитесь
  about_description?: string; // о курсе
  for_description?: string; // для кого этот курс
  start_description?: string; // начальные требования
  how_learn_description?: string; // как как проходит обучение
  what_give_description?: string; // что вы получаете
  language_id?: number;
  level_id?: number;
  recommended_load?: number;
}
export interface IArticleResponseEdit extends IArticle {}

export interface IArticlePayloadGet extends IArticlePayloadBase {
  id: ArticleId;
}
export interface IArticleResponseGet extends IArticle {}
