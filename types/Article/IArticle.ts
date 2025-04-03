import type { ICategory } from "../ICategory";
import type { ISubcategory } from "../ISubcategory";
import type { IUser } from "../IUser";
import type { ArticleId } from "./type";

export interface IArticle {
  id: ArticleId;
  title: string;
  owner: IUser;
  avatar: string;
  students: IUser[];
  teachers: IUser[];
  has_certificate: boolean;
  subcategories: ISubcategory[];
  categories: ICategory[];
  time: string;
  rate: string;
  price: number;
  short_content: string; // краткое описание
  what_learn_content: string; // чему вы научитесь
  about_content: string; // о курсе
  for_who_content: string; // для кого этот курс
  start_content: string; // начальные требования
  how_learn_content: string; // как как проходит обучение
  what_give_content: string; // что вы получаете
  language: {
    id: number;
    title: string;
  };
  level: {
    id: number;
    title: string;
    level: number;
  };
  recommended_load: number;
}
