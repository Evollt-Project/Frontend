import type { ICatalog } from "./ICatalog";
import type { ISubcategory } from "./ISubcategory";

export interface ICategory {
  id: number;
  title: string;
  photo: string;
  description: string;
  catalog: ICatalog;
  subcategories: ISubcategory[];
}
