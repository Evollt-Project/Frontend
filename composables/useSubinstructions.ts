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
import type { ISubinstruction } from "~/types/Subinstruction/ISubinstruction";
import type { IPagination } from "~/types/Base/IPagination";

export class Instruction {
  static readonly BASE_URL = "api/v1/subinstruction";

  static async getAll(params: object) {
    return useRequest<IPagination<ISubinstruction>>({
      url: this.BASE_URL,
      params: params,
    }).then((response) => {
      return response.data;
    });
  }

  static async create(params: ISubinstructionPayloadCreate) {
    return useRequest<ISubinstructionResponseCreate>({
      url: this.BASE_URL,
      method: "POST",
      body: params,
    });
  }

  static async get({ id, ...payload }: ISubinstructionPayloadGet) {
    return useRequest<ISubinstructionResponseGet>({
      url: this.BASE_URL + "/" + id,
      params: payload,
    }).catch((response) => {
      useErrorNotification(response.response.data);
      return null;
    });
  }

  static async update(
    id: SubinstructionId,
    payload: ISubinstructionPayloadUpdate,
  ) {
    const formData = useFormatToFormData(payload); // генерируем formData из payload
    formData.append("_method", "PUT"); // добавляем метод

    return useRequest<ISubinstructionResponseUpdate>({
      url: this.BASE_URL + "/" + id,
      method: "POST",
      body: formData,
    });
  }

  static async search({ search }: ISubinstructionPayloadSearch) {
    return useRequest<ISubinstructionResponseSearch>({
      url: this.BASE_URL + "/search",
      params: search,
    }).catch((response) => {
      useErrorNotification(response.response.data);
      return null;
    });
  }

  static async delete({ id }: ISubinstructionPayloadDelete) {
    return useRequest<ISubinstructionResponseDelete>({
      url: this.BASE_URL + "/" + id,
    }).catch((response) => {
      useErrorNotification(response.response.data);
      return null;
    });
  }
}
