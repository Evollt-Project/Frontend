export interface IBaseCodeResponse {
  status: boolean;
}

export interface ISendCodePayload {
  phone: string;
}

export interface ISendCodeResponse extends IBaseCodeResponse {}

export interface ICheckCodePayload extends ISendCodePayload {
  code: string;
}

export interface ICheckCodeResponse extends IBaseCodeResponse {}

export interface ICheckEmailExistsPayload {
  email: string;
}

export interface ICheckEmailExistsResponse {
  exists: boolean;
}

export interface IApproveEmailPayload {
  id: number;
  hash: string;
  expires: string;
  signature: string;
}

export interface IApproveEmailResponse {
  message: string;
  token: string;
}
