export interface IRegisterUser {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
