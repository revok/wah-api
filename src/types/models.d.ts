import { Document, Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { IEntry } from '../interfaces/entry.interface';

declare global {
  namespace Models {
    export type EntryModel = Model<IEntry & Document>;
    export type UserModel = Model<IUser & Document>;
  }
}
