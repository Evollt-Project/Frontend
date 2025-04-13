import type { IPagination } from "~/types/Base/IPagination";
import type { IArticle } from "./IArticle";

type ArticleId = number;

export interface IArticlePayloadBase {
  search?: string;
}

export interface IArticleResponseBase extends IArticle {}

export interface IArticlePayloadCreate extends IArticlePayloadBase {
  title: string;
}

export interface ITeachingCoursePayload extends IArticlePayloadBase {
  page: number;
}

export interface ITeachingCourseResponse
  extends IPagination<IArticleResponseBase> {}

export interface IArticleResponseCreate extends IArticleResponseBase {}

export interface IArticlePayloadEdit extends IArticlePayloadBase {
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

export interface IArticleResponseEdit extends IArticleResponseBase {}

export interface IArticlePayloadGet extends IArticlePayloadBase {
  id: ArticleId;
}

export interface IArticleResponseGet extends IArticleResponseBase {}

export interface IArticlePayloadSearch extends IArticlePayloadBase {
  search: string;
  certificates?: boolean;
  discount?: boolean;
  free?: boolean;
  min_price?: number;
  max_price?: number;
  levels: LevelId[];
  languages: LanguageId[];
}

export interface IArticleResponseSearch extends IArticleResponseBase {}
