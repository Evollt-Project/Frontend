import type { ISubinstruction } from "~/types/Subinstruction/ISubinstruction";
import type { IPagination } from "~/types/Base/IPagination";

type SubinstructionId = number;

export interface ISubinstructionPayloadBase {}
export interface ISubinstructionResponseBase extends ISubinstruction {}

export interface ISubinstructionPayloadCreate
  extends ISubinstructionPayloadBase {
  title: string;
  logo: string;
  short_content: string;
  content: string;
  instruction_id: string;
}

export interface ISubinstructionResponseCreate
  extends ISubinstructionResponseBase {}

export interface ISubinstructionPayloadGetAll
  extends ISubinstructionPayloadBase {}

export interface ISubinstructionResponseGetAll
  extends IPagination<ISubinstructionResponseBase> {}

export interface ISubinstructionPayloadUpdate
  extends ISubinstructionPayloadBase {
  id: number;
  title?: string;
  logo?: string;
  short_content?: string;
  content?: string;
}

export interface ISubinstructionResponseUpdate
  extends ISubinstructionResponseBase {}

export interface ISubinstructionPayloadSearch
  extends ISubinstructionPayloadBase {
  search: string;
}

export interface ISubinstructionResponseSearch
  extends IPagination<ISubinstructionResponseBase> {}

export interface ISubinstructionPayloadDelete
  extends ISubinstructionPayloadBase {
  id: SubinstructionId;
}

export interface ISubinstructionResponseDelete {
  message: string;
}
