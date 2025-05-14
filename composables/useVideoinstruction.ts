import type {
  IVideoinstructionPayloadCreate,
  IVideoinstructionPayloadGetAll,
  IVideoinstructionPayloadGetById,
  IVideoinstructionResponseGetAll,
  IVideoinstructionResponseUpdate,
  IVideoinstructionResponseGetById,
  IVideoinstructionResponseCreate,
  IVideoinstructionPayloadUpdate,
  IVideoinstructionPayloadDelete,
  IVideoinstructionResponseDelete,
} from "~/types/Videoinstruction/type";

export class Videoinstruction {
  static readonly BASE_URL = "/api/v1/videoinstruction";

  static async getAll(params: IVideoinstructionPayloadGetAll = {}) {
    return await useRequest<IVideoinstructionResponseGetAll>({
      url: this.BASE_URL,
      params,
    }).catch((response) => {
      useErrorNotification(response.response.data);
      return null;
    });
  }

  static async getById({ id }: IVideoinstructionPayloadGetById) {
    return await useRequest<IVideoinstructionResponseGetById>({
      url: this.BASE_URL + "/" + id,
    });
  }

  static async create(params: IVideoinstructionPayloadCreate) {
    return await useRequest<IVideoinstructionResponseCreate>({
      url: this.BASE_URL,
      method: "POST",
      body: params,
    });
  }

  static async update({ id, ...params }: IVideoinstructionPayloadUpdate) {
    return await useRequest<IVideoinstructionResponseUpdate>({
      url: this.BASE_URL + "/" + id,
      method: "POST",
      body: {
        _method: "PUT",
        ...params,
      },
    });
  }

  static async delete({ id }: IVideoinstructionPayloadDelete) {
    return await useRequest<IVideoinstructionResponseDelete>({
      url: this.BASE_URL + "/" + id,
      method: "DELETE",
    });
  }
}
