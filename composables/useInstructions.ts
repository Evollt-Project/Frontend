import type {
  IInstructionPayloadCreate,
  IInstructionPayloadUpdate,
  IInstructionPayloadGetAll,
  IInstructionPayloadSearch,
  IInstructionPayloadDelete,
  IInstructionResponseCreate,
  IInstructionResponseGetAll,
  IInstructionResponseUpdate,
  IInstructionResponseSearch,
  IInstructionResponseDelete,
} from "~/types/Instruction/type";

export class Instruction {
  static async getAll(params: IInstructionPayloadGetAll) {
    return await useRequest<IInstructionResponseGetAll>({
      url: "/api/v1/instruction",
      params,
    })
      .then((response) => response.data)
      .catch((response) => {
        useErrorNotification(response.response.data);
        return null;
      });
  }

  static async create(params: IInstructionPayloadCreate) {
    return await useRequest<IInstructionResponseCreate>({
      url: "/api/v1/instruction",
      method: "POST",
      body: params,
    });
  }

  static async update({ id, ...params }: IInstructionPayloadUpdate) {
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
    return await useRequest<IInstructionResponseSearch>({
      url: "/api/v1/instruction/search",
      params,
    })
      .then((response) => response.data)
      .catch((response) => {
        useErrorNotification(response.response.data);
        return null;
      });
  }

  static async delete({ id }: IInstructionPayloadDelete) {
    return await useRequest<IInstructionResponseDelete>({
      url: `/api/v1/instruction/${id}`,
      method: "DELETE",
    });
  }
}
