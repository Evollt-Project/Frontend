import type {
  IModulePayloadCreate,
  IModulePayloadDelete,
  IModulePayloadEdit,
  IModulePayloadGet,
  IModuleResponseCreate,
  IModuleResponseDelete,
  IModuleResponseEdit,
  IModuleResponseGet,
} from "~/types/Module/type";

export class Module {
  static async getCourseModules(params: IModulePayloadGet) {
    return await useRequest<IModuleResponseGet[]>({
      url: "/api/v1/module",
      params,
    });
  }

  static async create(params: IModulePayloadCreate) {
    return await useRequest<IModuleResponseCreate>({
      url: "/api/v1/module",
      method: "POST",
      body: params,
    });
  }

  static async edit(id: number, params: IModulePayloadEdit) {
    return await useRequest<IModuleResponseEdit>({
      url: `/api/v1/module/` + id,
      method: "POST",
      body: {
        _method: "PUT",
        ...params,
      },
    });
  }

  static async delete(params: IModulePayloadDelete) {
    return await useRequest<IModuleResponseDelete>({
      url: `/api/v1/module/${params.id}`,
      method: "DELETE",
    });
  }
}
