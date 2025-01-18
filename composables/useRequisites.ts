import type { IBank } from "~/types/Dadata/IBank"
import type { ICompany } from "~/types/Dadata/ICompany"

export class Requisites {
  static readonly PHYSICAL = 0
  static readonly INDIVIDUAL = 1
  static readonly JURIDICAL = 2
  static readonly SELF_EMPLOYED = 3

  static readonly NALOG_STATUSES = [
    { id: this.PHYSICAL, title: 'Физическое лицо' },
    { id: this.INDIVIDUAL, title: 'Индивидуальный предприниматель' },
    { id: this.JURIDICAL, title: 'Юридическое лицо' },
    { id: this.SELF_EMPLOYED, title: 'Самозанятый' }
  ]

  static readonly NALOG_STATUS_DESCRIPTION: { [key: number]: string } = {
    [this.PHYSICAL]: "Обратите внимание, что при выборе статуса «Физическое лицо», из вашего вознаграждения за аренду будет удерживаться НДФЛ в размере 13% от размера вознаграждения.",
    [this.SELF_EMPLOYED]: "Обратите внимание, что при выборе статуса «Самозанятый», после каждой выплаты за аренду квартиры необходимо прикреплять чеки в разделе <span class=\"font-bold\">\"Документы\"</span>"
  }

  static async getCompanyByInn(inn: string) {
    return await $fetch<ICompany[]>('/apijs/dadata/dadata_sugget', {
      params: {
        type: 'company',
        query: inn
      }
    })
  }
  static async getBankByBik(bik: string) {
    return await $fetch<IBank[]>('/apijs/dadata/dadata_sugget', {
      params: {
        type: 'bank',
        query: bik
      }
    })
  }
}