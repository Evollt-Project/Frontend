import type { ICategory } from "./ICategory";

export interface ICatalog {
  id: number;
  title: string;
  photo: string;
  categories: ICategory[];
}
