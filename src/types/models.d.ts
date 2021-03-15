import { Document, Model } from 'mongoose';
import { IEntry } from '../interfaces/entry.interface';

declare global {
  namespace Models {
    export type EntryModel = Model<IEntry & Document>;
  }
}
