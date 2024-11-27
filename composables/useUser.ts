import type { ILogin, IRegister } from "~/types/Auth";
import type { IUser } from "~/types/IUser";

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
}
