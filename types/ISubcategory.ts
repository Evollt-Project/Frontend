import type { ICategory } from "./ICategory";

export interface ISubcategory {
  id: number;
  title: string;
  category: ICategory;
}
