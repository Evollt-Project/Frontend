import type { ILogin, IRegister } from "~/types/Auth";
import type { IEnum } from "~/types/IEnum";
import type { ISkill, IUser } from "~/types/IUser";

export class User {
  static readonly DEBOUNCE_DELAY = 800;
  static readonly STUDENT = 1;
  static readonly TEACHER = 3;
  static readonly MODERATOR = 7;
  static readonly ADMIN = 15;
  static get store() {
    return useAuthStore();
  }
  static get router() {
    return useRouter();
  }

  static async get(): Promise<IUser> {
    return await useRequest<IUser>({
      url: "/api/v1/user/get",
      method: "get",
    }).then((response) => {
      this.store.user = response.data;

      return response.data;
    });
  }

  static async getById(id: number): Promise<IUser | { message: string }> {
    return await useRequest<IUser | { message: string }>({
      url: `/api/v1/user/get/${id}`,
      method: "get",
    }).then((response) => {
      return response.data;
    })
  }

  static async getEnums() {
    return useRequest<IEnum>({
      url: "api/v1/enums",
    }).then((response) => {
      this.store.enums = response.data;

      return response.data;
    });
  }

  static hasPermission(permission: number): boolean {
    if (!this.store.user) {
      return false
    }
    return (this.store.user.role & permission) === permission;
  }

  static getAllPermissions(user?: IUser | null): (1 | 3 | 7 | 15)[] {
    const selectedUser: IUser | null = user ?? this.store.user
    if (selectedUser && this.store.enums) {
      const role = selectedUser.role
      return Object.entries(this.store.enums.roles)
        .filter(([key]) => {
          return (role & Number(key)) > 0 && Number(key) <= role;
        })
        .map(([key]) => Number(key) as 1 | 3 | 7 | 15);
    }
    return []
  }

  static async login(params: ILogin): Promise<IUser> {
    return await useRequest<IUser>({
      url: "/api/v1/auth/login",
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
      url: "/api/v1/auth/register",
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
      url: "api/v1/auth/logout",
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
      url: 'api/v1/user/update',
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
      url: 'api/v1/user/skills',
    })
  }

  static async changePassword(data: object) {
    return await useRequest<{ status: boolean, message: string }>({
      url: 'api/v1/user/update/password',
      method: "POST",
      body: data
    })
  }
}
