export type IUser = {
  createdAt: Date;
  id: string;
  username: string;
  email: string;
  password: string;
};

export interface IUserSignInDTO {
  email: string;
  password: string;
}

export interface IUserSighUpDTO extends IUserSignInDTO {
  username: string;
}
