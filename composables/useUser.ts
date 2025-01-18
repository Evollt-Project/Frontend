import { toast } from "vue3-toastify";
import type { ILogin, IRegister } from "~/types/Auth";
import type { ISkill, IUser } from "~/types/IUser";

export class User {
  static get store() {
    return useAuthStore();
  }
  static get router() {
    return useRouter();
  }

  static async get(): Promise<IUser> {
    return await useRequest<IUser>({
      url: "/api/user/get",
      method: "get",
    }).then((response) => {
      this.store.user = response.data;

      return response.data;
    });
  }

  static async getEnums() {
    return await useRequest<IUser>({
      url: "api/enums",
    }).then((response) => {
      this.store.enums = response.data;

      return response.data;
    });
  }

  // TODO: Доделать разделение ролей на бэке и фронте
  static hasPermission(role: number, permission: number): boolean {
    return (role & permission) === permission;
  }

  static async login(params: ILogin): Promise<IUser> {
    return await useRequest<IUser>({
      url: "/api/auth/login",
      method: "post",
      body: params,
    })
      .then((response) => {
        this.store.user = response.data;
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);

          this.router.push({
            name: "profile",
          });
        }

        return response.data;
      })
      .catch((response) => {
        useErrorNotification(
          response.response.data.errors ?? response.response.data,
        );
        return response.response.data;
      });
  }

  static async register(params: IRegister): Promise<IUser> {
    return await useRequest<IUser>({
      url: "/api/auth/register",
      method: "post",
      body: params,
    })
      .then((response) => {
        this.store.user = response.data;
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);

          this.router.push({
            name: "profile",
          });
        }

        return response.data;
      })
      .catch((response) => {
        useErrorNotification(response.response.data.errors);
        return response.response.data;
      });
  }

  static async logout() {
    return await useRequest<{ status: boolean }>({
      url: "api/auth/logout",
    }).then((response) => {
      if (response.data.status) {
        this.store.user = null;
        localStorage.removeItem("token");
        this.router.push({ name: "index" });
      }
    });
  }

  static async update(data: object) {
    return await useRequest<IUser>({
      url: 'api/user/update',
      method: "POST",
      body: data
    })
      .then(response => {
        this.store.user = response.data
        return response.data
      })
      .catch((response) => {
        useErrorNotification(response.response.data.errors);
        return response.response.data;
      });
  }
  static async skills() {
    return await useRequest<ISkill[]>({
      url: 'api/user/skills',
    })
  }
  static async changePassword(data: object) {
    return await useRequest<{ status: boolean, message: string }>({
      url: 'api/user/update/password',
      method: "POST",
      body: data
    })
  }
}
