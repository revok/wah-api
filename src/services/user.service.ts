
import { IUser } from '../interfaces/user.interface';
import { Inject, Service } from 'typedi';

@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel
  ) {
  }

  /**
   * Return a list of all users.
   */
  public async getUsers(): Promise<IUser[]> {
    return this.userModel.find({});
  }

  /**
   * Create a new user.
   *
   * @param entryDTO
   * @returns 
   */
  public async createUser(userDTO: IUser): Promise<IUser> {
    return this.userModel.create(userDTO);
  }

  /**
   * Given a username and password, see if you have a record that matches.
   * @param userDTO 
   * @returns 
   */
  public async authenticate(userDTO: IUser): Promise<boolean> {
    const user = await this.userModel.findOne({ username: userDTO.username });

    if (!user) {
      return Promise.resolve(false);
    } else {
      return user.isCorrectPassword(userDTO.password);
    }
  };
}