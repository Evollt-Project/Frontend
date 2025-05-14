import type { IPagination } from "~/types/Base/IPagination";
import type { IVideoinstruction } from "~/types/Videoinstruction/IVideoinstruction";

type VideoinstructionId = number;

export interface IVideoinstructionPayloadBase {}
export interface IVideoinstructionResponseBase extends IVideoinstruction {}

export interface IVideoinstructionPayloadCreate
  extends IVideoinstructionPayloadBase {
  title: string;
  platform: number;
  video_url: string;
}

export interface IVideoinstructionResponseCreate
  extends IVideoinstructionResponseBase {}

export interface IVideoinstructionPayloadUpdate
  extends IVideoinstructionPayloadBase {
  id: number;
  title: string;
  platform?: number;
  video_url?: string;
}

export interface IVideoinstructionResponseUpdate
  extends IVideoinstructionResponseBase {}

export interface IVideoinstructionPayloadGetAll
  extends IVideoinstructionPayloadBase {}

export interface IVideoinstructionResponseGetAll
  extends IPagination<IVideoinstructionResponseBase> {}

export interface IVideoinstructionPayloadGetById
  extends IVideoinstructionPayloadBase {
  id: number;
}

export interface IVideoinstructionResponseGetById
  extends IPagination<IVideoinstructionResponseBase> {}

export interface IVideoinstructionPayloadDelete
  extends IVideoinstructionPayloadBase {
  id: number;
}

export interface IVideoinstructionResponseDelete
  extends IVideoinstructionResponseBase {}
