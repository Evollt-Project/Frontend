import axios, {
  AxiosHeaders,
  type AxiosResponse,
  type Method,
  type ResponseType,
} from "axios";

interface IRequest {
  url: string;
  method?: Method;
  params?: any;
  body?: any;
  headers?: AxiosHeaders;
  type?: ResponseType;
}

export const useRequest = async <T>(
  request: IRequest,
): Promise<AxiosResponse<T, any>> => {
  const config = useRuntimeConfig();

  return await axios.request<T>({
    url: request.url,
    method: request.method ?? "get",
    baseURL: config.public.url,
    data: request.body ?? {},
    params: {
      ...request.params,
    },
    headers: {
      authorization: "Bearer " + localStorage.getItem("token"),
      ...request.headers,
    },
    responseType: request.type ?? "json",
  });
};
