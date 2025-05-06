import type {
  ISubinstructionPayloadCreate,
  ISubinstructionPayloadUpdate,
  ISubinstructionPayloadGetAll,
  ISubinstructionPayloadDelete,
  ISubinstructionResponseCreate,
  ISubinstructionResponseGetAll,
  ISubinstructionResponseUpdate,
  ISubinstructionResponseDelete,
} from "~/types/Subinstruction/type";

export class Subinstruction {
  static readonly BASE_URL = "/api/v1/subinstruction";

  static async getAll(params: ISubinstructionPayloadGetAll) {
    return await useRequest<ISubinstructionResponseGetAll>({
      url: this.BASE_URL,
      params,
    }).catch((response) => {
      useErrorNotification(response.response.data);
      return null;
    });
  }

  static async create(params: ISubinstructionPayloadCreate) {
    return await useRequest<ISubinstructionResponseCreate>({
      url: this.BASE_URL,
      method: "POST",
      body: params,
    });
  }

  static async update({ id, ...params }: ISubinstructionPayloadUpdate) {
    return await useRequest<ISubinstructionResponseUpdate>({
      url: this.BASE_URL + "/" + id,
      method: "POST",
      body: {
        _method: "PUT",
        ...params,
      },
    });
  }

  static async delete({ id }: ISubinstructionPayloadDelete) {
    return await useRequest<ISubinstructionResponseDelete>({
      url: this.BASE_URL + "/" + id,
      method: "DELETE",
    });
  }
}
