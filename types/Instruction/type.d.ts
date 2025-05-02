import type { IInstruction } from "~/types/Instruction/IInstruction";
import type { IPagination } from "~/types/Base/IPagination";

type InstructionId = number;

export interface IInstructionPayloadBase {}
export interface IInstructionResponseBase extends IInstruction {}

export interface IInstructionPayloadCreate extends IInstructionPayloadBase {
  title: string;
  logo: string;
  short_description: string;
  description: string;
}

export interface IInstructionResponseCreate extends IInstructionResponseBase {}

export interface IInstructionPayloadGet extends IInstructionPayloadBase {}

export interface IInstructionResponseGet
  extends IPagination<IInstructionResponseBase> {}

export interface IInstructionPayloadUpdate extends IInstructionPayloadBase {
  title?: string;
  logo?: string;
  short_description?: string;
  description?: string;
}

export interface IInstructionResponseUpdate extends IInstructionResponseBase {}

export interface IInstructionPayloadSearch extends IInstructionPayloadBase {}

export interface IInstructionResponseSearch
  extends IPagination<IInstructionResponseBase> {}

export interface IInstructionPayloadDelete extends IInstructionPayloadBase {}

export interface IInstructionResponseDelete extends IInstructionResponseBase {
  message: string;
}
