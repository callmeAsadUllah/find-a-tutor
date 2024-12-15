export interface IResponse<T> {
  statusCode?: number;
  message?: string;
  data?: T | T[] | null;
  accessToken?: string;
  refreshToken?: string;
  phoneNumber?: string;
}
