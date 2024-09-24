export interface ISignInDTO {
  email:string;
  password:string;
}

export interface ISignInResponse {
  accessToken:string,
  accessRefresh:string,
  username:string,
  userId:string
}

export interface IRefreshTokenResponse {
  accessToken:string,
  accessRefresh:string,
  username:string,
  userId:string
}