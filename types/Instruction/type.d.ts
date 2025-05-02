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

export interface IInstructionResponseGet extends IPagination<IInstructionResponseBase> {}

export interface IInstructionResponseUpdate extends IInstructionResponseBase {}

export interface IInstructionResponseSearch extends IPagination<IInstructionResponseBase> {}

export interface IInstructionPayloadDelete extends IInstructionPayloadBase {
  message: string
}

export interface IInstructionResponseDelete extends IInstructionResponseBase {}
