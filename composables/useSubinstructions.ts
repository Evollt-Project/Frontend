import type {
  SubinstructionId,
  ISubinstructionPayloadCreate,
  ISubinstructionPayloadUpdate,
  ISubinstructionPayloadGet,
  ISubinstructionPayloadSearch,
  ISubinstructionPayloadDelete,
  ISubinstructionResponseCreate,
  ISubinstructionResponseGet,
  ISubinstructionResponseUpdate,
  ISubinstructionResponseSearch,
  ISubinstructionResponseDelete,
} from "~/types/Subinstruction/type";

export class Subinstruction {
  static async get(params: ISubinstructionPayloadGet) {
    return await useRequest<ISubinstructionResponseGet[]>({
      url: "/api/v1/Subinstruction",
      params,
    });
  }

  static async create(params: ISubinstructionPayloadCreate) {
    return await useRequest<ISubinstructionResponseCreate>({
      url: "/api/v1/Subinstruction",
      method: "POST",
      body: params,
    });
  }

  static async edit(
    id: SubinstructionId,
    params: ISubinstructionPayloadUpdate,
  ) {
    return await useRequest<ISubinstructionResponseUpdate>({
      url: `/api/v1/Subinstruction/` + id,
      method: "POST",
      body: {
        _method: "PUT",
        ...params,
      },
    });
  }

  static async search(params: ISubinstructionPayloadSearch) {
    return await useRequest<ISubinstructionResponseSearch[]>({
      url: "/api/v1/Subinstruction/search",
      params,
    });
  }

  static async delete(params: ISubinstructionPayloadDelete) {
    return await useRequest<ISubinstructionResponseDelete>({
      url: `/api/v1/Subinstruction/${params.id}`,
      method: "DELETE",
    });
  }
}
