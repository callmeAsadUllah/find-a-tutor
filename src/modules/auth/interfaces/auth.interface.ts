export interface IRegister {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IPhoneNumber {
  phoneNumber: string;
}

export interface IVerifyCode {
  phoneNumber: string;
  code: string;
}
