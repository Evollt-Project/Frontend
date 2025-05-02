import type {
  InstructionId,
  IInstructionPayloadCreate,
  IInstructionPayloadUpdate,
  IInstructionPayloadGet,
  IInstructionPayloadSearch,
  IInstructionPayloadDelete,
  IInstructionResponseCreate,
  IInstructionResponseGet,
  IInstructionResponseUpdate,
  IInstructionResponseSearch,
  IInstructionResponseDelete,
} from "~/types/Instruction/type";

export class Instruction {
  static async getInstructions(params: IInstructionPayloadGet) {
    return await useRequest<IInstructionResponseGet[]>({
      url: "/api/v1/instruction",
      params,
    });
  }

  static async create(params: IInstructionPayloadCreate) {
    return await useRequest<IInstructionResponseCreate>({
      url: "/api/v1/instruction",
      method: "POST",
      body: params,
    });
  }

  static async edit(id: InstructionId, params: IInstructionPayloadUpdate) {
    return await useRequest<IInstructionResponseUpdate>({
      url: `/api/v1/instruction/` + id,
      method: "POST",
      body: {
        _method: "PUT",
        ...params,
      },
    });
  }

  static async search(params: IInstructionPayloadSearch) {
    return await useRequest<IInstructionResponseSearch[]>({
      url: "/api/v1/instruction/search",
      params,
    });
  }

  static async delete(params: IInstructionPayloadDelete) {
    return await useRequest<IInstructionResponseDelete>({
      url: `/api/v1/instruction/${params.id}`,
      method: "DELETE",
    });
  }
}
