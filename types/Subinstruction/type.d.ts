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
  instruction_id: string;
}

export interface ISubinstructionResponseCreate
  extends ISubinstructionResponseBase {}

export interface ISubinstructionPayloadGet extends ISubinstructionPayloadBase {}

export interface ISubinstructionResponseGet
  extends IPagination<ISubinstructionResponseBase> {}

export interface ISubinstructionPayloadUpdate
  extends ISubinstructionPayloadBase {
  title?: string;
  logo?: string;
  short_description?: string;
  description?: string;
}

export interface ISubinstructionResponseUpdate
  extends ISubinstructionResponseBase {}

export interface ISubinstructionPayloadSearch
  extends ISubinstructionPayloadBase {}

export interface IInstructionResponseSearch
  extends IPagination<ISubinstructionResponseBase> {}

export interface ISubinstructionPayloadDelete
  extends ISubinstructionPayloadBase {}

export interface ISubinstructionResponseDelete
  extends ISubinstructionResponseBase {
  message: string;
}
