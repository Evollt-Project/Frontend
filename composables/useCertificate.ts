import type { ICertificate } from "~/types/ICertificate";
import type { IPagination } from "~/types/IPagination";

export class Certificate {

  static async getMy(params: object) {
    return useRequest<IPagination<ICertificate>>({
      url: 'api/v1/certificate',
      params: params
    }).then(response => {
      return response.data
    }).catch(response => {
      useErrorNotification(
        response.response.data
      );
      return null
    })
  }
}