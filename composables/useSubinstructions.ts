import type {
  ISubinstructionPayloadCreate,
  ISubinstructionPayloadUpdate,
  ISubinstructionPayloadGetAll,
  ISubinstructionPayloadSearch,
  ISubinstructionPayloadDelete,
  ISubinstructionResponseCreate,
  ISubinstructionResponseGetAll,
  ISubinstructionResponseUpdate,
  ISubinstructionResponseSearch,
  ISubinstructionResponseDelete,
} from "~/types/Subinstruction/type";

export class Subinstruction {
  static async getAll(params: ISubinstructionPayloadGetAll) {
    return await useRequest<ISubinstructionResponseGetAll>({
      url: "/api/v1/subinstruction",
      params,
    })
      .then((response) => response.data)
      .catch((response) => {
        useErrorNotification(response.response.data);
        return null;
      });
  }

  static async create(params: ISubinstructionPayloadCreate) {
    return await useRequest<ISubinstructionResponseCreate>({
      url: "/api/v1/subinstruction",
      method: "POST",
      body: params,
    });
  }

  static async update({ id, ...params }: ISubinstructionPayloadUpdate) {
    return await useRequest<ISubinstructionResponseUpdate>({
      url: `/api/v1/subinstruction/` + id,
      method: "POST",
      body: {
        _method: "PUT",
        ...params,
      },
    });
  }

  static async search(params: ISubinstructionPayloadSearch) {
    return await useRequest<ISubinstructionResponseSearch>({
      url: "/api/v1/subinstruction/search",
      params,
    })
      .then((response) => response.data)
      .catch((response) => {
        useErrorNotification(response.response.data);
        return null;
      });
  }

  static async delete({ id }: ISubinstructionPayloadDelete) {
    return await useRequest<ISubinstructionResponseDelete>({
      url: `/api/v1/subinstruction/${id}`,
      method: "DELETE",
    });
  }
}
