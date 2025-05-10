import type { IInstruction } from "~/types/Instruction/IInstruction";
import type { SubinstructionId } from "~/types/Subinstruction/type";

export interface ISubinstruction {
  id: SubinstructionId;
  title: string;
  logo: string;
  short_description: string;
  description: string;
  instruction?: IInstruction;
}
