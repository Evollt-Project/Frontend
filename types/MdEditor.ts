import type { Themes } from "md-editor-v3";

export type Config = {
  previewTheme: string;
  codeTheme: string;
  language: string;
  theme: Themes;
  maxLength?: number;
};
