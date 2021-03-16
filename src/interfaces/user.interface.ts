export interface IUser {
  username: string;
  password: string;


  isCorrectPassword ?: (p: string) => Promise<boolean>
}