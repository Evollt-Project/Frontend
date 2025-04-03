import type { IArticle } from "./Article/IArticle";
import type { ICategory } from "./ICategory";

export interface ISubcategory {
  id: number;
  title: string;
  color: string;
  articles: IArticle[];
  category: ICategory;
}
