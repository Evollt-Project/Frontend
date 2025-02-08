import type { ICatalog } from "./ICatalog";
import type { ISubcategory } from "./ISubcategory";

export interface ICategory {
  id: number;
  title: string;
  photo: string;
  color: string;
  articles_count: number;
  description: string;
  catalog: ICatalog;
  subcategories: ISubcategory[];
}
