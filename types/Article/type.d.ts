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
  short_content?: string; // короткое описание
  what_learn_content?: string; // чему вы научитесь
  about_content?: string; // о курсе
  for_who_content?: string; // для кого этот курс
  start_content?: string; // начальные требования
  how_learn_content?: string; // как как проходит обучение
  what_give_content?: string; // что вы получаете
  language_id?: number;
  level_id?: number;
  recommended_load?: number;
  teachers_id?: number[];
}

export interface IArticleResponseEdit extends IArticle {}

export interface IArticlePayloadGet extends IArticlePayloadBase {
  id: ArticleId;
}

export interface IArticleResponseGet extends IArticle {}
