import type { ICertificate, ICertificateType } from "~/types/ICertificate";
import type { IPagination } from "~/types/Base/IPagination";

export class Certificate {
  private static resourceCertificateUrl = 'api/v1/certificate'
  private static resourceCertificateTypeUrl = 'api/v1/certificate_type'

  static async getMy(params: object) {
    return useRequest<IPagination<ICertificate>>({
      url: this.resourceCertificateUrl,
      params: params
    }).then(response => response.data).catch(response => {
      useErrorNotification(
        response.response.data
      );
      return null
    })
  }

  static async getMyLayouts(params: object) {
    return useRequest<IPagination<ICertificateType>>({
      url: this.resourceCertificateTypeUrl,
      params: params
    }).then(response => response.data).catch(response => {
      useErrorNotification(
        response.response.data
      );
      return null
    })
  }

  static async createLayout(data: FormData) {
    return useRequest<ICertificateType>({
      url: this.resourceCertificateTypeUrl,
      method: "POST",
      body: data
    }).then(response => response.data).catch(response => {
      useErrorNotification(
        response.response.data
      );
      return null
    })
  }
}