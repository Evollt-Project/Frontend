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
}
