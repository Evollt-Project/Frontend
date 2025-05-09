import type {
  IInstructionPayloadCreate,
  IInstructionPayloadDelete,
  IInstructionPayloadGetAll,
  IInstructionPayloadGetById,
  IInstructionPayloadUpdate,
  IInstructionResponseCreate,
  IInstructionResponseDelete,
  IInstructionResponseGetAll,
  IInstructionResponseGetById,
  IInstructionResponseUpdate,
} from "~/types/Instruction/type";

export class Instruction {
  static readonly BASE_URL = "/api/v1/instruction";

  static async getAll(params: IInstructionPayloadGetAll = {}) {
    return await useRequest<IInstructionResponseGetAll>({
      url: this.BASE_URL,
      params,
    }).catch((response) => {
      useErrorNotification(response.response.data);
      return null;
    });
  }

  static async getById({ id }: IInstructionPayloadGetById) {
    return await useRequest<IInstructionResponseGetById>({
      url: this.BASE_URL + "/" + id,
    }).catch((response) => {
      useErrorNotification(response.response.data);
      return null;
    });
  }

  static async create(params: IInstructionPayloadCreate) {
    return await useRequest<IInstructionResponseCreate>({
      url: this.BASE_URL,
      method: "POST",
      body: params,
    });
  }

  static async update({ id, ...params }: IInstructionPayloadUpdate) {
    return await useRequest<IInstructionResponseUpdate>({
      url: this.BASE_URL + "/" + id,
      method: "POST",
      body: {
        _method: "PUT",
        ...params,
      },
    });
  }

  static async delete({ id }: IInstructionPayloadDelete) {
    return await useRequest<IInstructionResponseDelete>({
      url: this.BASE_URL + "/" + id,
      method: "DELETE",
    });
  }
}
