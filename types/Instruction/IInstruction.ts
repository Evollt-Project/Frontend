import type { InstructionId } from "~/types/Instruction/type";
import type { ISubinstruction } from "~/types/Subinstruction/ISubinstruction";

export interface IInstruction {
  id: InstructionId;
  title: string;
  logo: string;
  short_description: string;
  description: string;
  subinstructions?: ISubinstruction[];
}
