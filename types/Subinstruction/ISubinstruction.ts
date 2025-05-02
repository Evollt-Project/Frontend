import type { IInstruction } from "~/types/Instruction/IInstruction";

export interface ISubinstruction {
  id: SubinstructionId;
  title: string;
  logo: string;
  short_content: string;
  content: string;
  instruction: IInstruction[];
}
