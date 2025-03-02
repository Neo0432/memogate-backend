export type IUser = {
  createdAt: Date;
  id: string;
  name: string;
  email: string;
  password: string;
};

export interface IUserSignInDTO {
  email: string;
  password: string;
}

export interface IUserSighUpDTO extends IUserSignInDTO {
  name: string;
}
