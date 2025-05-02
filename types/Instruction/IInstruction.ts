export interface IInstruction {
  id: InstructionId;
  title: string;
  logo: string;
  short_description: string;
  description: string;
  subinstructions: Object[];
}
