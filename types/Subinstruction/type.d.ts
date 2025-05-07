import type { ISubinstruction } from "~/types/Subinstruction/ISubinstruction";
import type { IPagination } from "~/types/Base/IPagination";

type SubinstructionId = number;

export interface ISubinstructionPayloadBase {}
export interface ISubinstructionResponseBase extends ISubinstruction {}

export interface ISubinstructionPayloadCreate
  extends ISubinstructionPayloadBase {
  title: string;
  logo: string;
  short_description: string;
  description: string;
  instruction_id: number;
}

export interface ISubinstructionResponseCreate
  extends ISubinstructionResponseBase {}

export interface ISubinstructionPayloadGetAll
  extends ISubinstructionPayloadBase {
  page?: number;
  search?: string;
  per_page?: number;
}

export interface ISubinstructionResponseGetAll
  extends IPagination<ISubinstructionResponseBase> {}

export interface ISubinstructionPayloadUpdate
  extends ISubinstructionPayloadBase {
  id: number;
  title?: string;
  logo?: string;
  short_description?: string;
  description?: string;
}

export interface ISubinstructionResponseUpdate
  extends ISubinstructionResponseBase {}

export interface ISubinstructionPayloadDelete
  extends ISubinstructionPayloadBase {
  id: SubinstructionId;
}

export interface ISubinstructionResponseDelete {
  message: string;
}
