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
import type { IInstruction } from "~/types/Instruction/IInstruction";
import type { IPagination } from "~/types/Base/IPagination";

export class Instruction {
  static readonly BASE_URL = "api/v1/instruction";

  static async getAll(params: object) {
    return useRequest<IPagination<IInstruction>>({
      url: this.BASE_URL,
      params: params,
    }).then((response) => {
      return response.data;
    });
  }

  static async create(params: IInstructionPayloadCreate) {
    return useRequest<IInstructionResponseCreate>({
      url: this.BASE_URL,
      method: "POST",
      body: params,
    });
  }

  static async get({ id, ...payload }: IInstructionPayloadGet) {
    return useRequest<IInstructionResponseGet>({
      url: this.BASE_URL + "/" + id,
      params: payload,
    }).catch((response) => {
      useErrorNotification(response.response.data);
      return null;
    });
  }

  static async update(id: InstructionId, payload: IInstructionPayloadUpdate) {
    const formData = useFormatToFormData(payload); // генерируем formData из payload
    formData.append("_method", "PUT"); // добавляем метод

    return useRequest<IInstructionResponseUpdate>({
      url: this.BASE_URL + "/" + id,
      method: "POST",
      body: formData,
    });
  }

  static async search({ search }: IInstructionPayloadSearch) {
    return useRequest<IInstructionResponseSearch>({
      url: this.BASE_URL + "/search",
      params: search,
    }).catch((response) => {
      useErrorNotification(response.response.data);
      return null;
    });
  }

  static async delete({ id }: IInstructionPayloadDelete) {
    return useRequest<IInstructionResponseDelete>({
      url: this.BASE_URL + "/" + id,
    }).catch((response) => {
      useErrorNotification(response.response.data);
      return null;
    });
  }
}
