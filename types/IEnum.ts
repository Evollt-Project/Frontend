import type { ILanguage } from "./Language/ILanguage";

export type EnumValues<K extends number, V = string> = { [key in K]: V };

export interface IEnum {
  roles: EnumValues<1 | 3 | 7 | 15>;
  article_types: EnumValues<0 | 1 | 2>;
  certificate_types: EnumValues<0 | 1 | 2>;
  languages: ILanguage[];
}
