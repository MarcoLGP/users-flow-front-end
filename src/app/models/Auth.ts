export interface ISignOutResponse {
  token: string;
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export interface ISignInResponse {
  token: string;
  refreshToken: string;
  name: string;
  email: string;
}
