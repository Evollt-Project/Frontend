import type { IModule } from "./IModule";

export interface IModulePayloadBase {}
export interface IModuleResponseBase extends IModule {}

export interface IModulePayloadCreate extends IModulePayloadBase {
  article_id: number;
  title: string;
  description: string;
  opened_date: string;
}
export interface IModuleResponseCreate extends IModuleResponseBase {}

export interface IModulePayloadEdit extends IModulePayloadBase {
  article_id?: number;
  title?: string;
  description?: string;
  opened_date?: string;
}
export interface IModuleResponseEdit extends IModuleResponseBase {}

export interface IModulePayloadGet extends IModulePayloadBase {
  article_id: number;
}
export interface IModuleResponseGet extends IModuleResponseBase {}

export interface IModulePayloadDelete extends IModulePayloadBase {
  id: number;
}
export interface IModuleResponseDelete extends IModuleResponseBase {}
