export class Notification {
  static readonly ANY = 0
  static readonly UNREAD = 1
  static readonly READ = 2
  static readonly NOTIFICATION_STATUSES = [
    { id: 0, title: 'Любой статус' },
    { id: 1, title: 'Непрочитанные' },
    { id: 2, title: 'Прочитанные' },
  ]
  static get store() {
    return useNotificationStore();
  }
}