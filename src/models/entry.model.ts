import mongoose, { Schema, Document } from 'mongoose';
import { IEntry } from '../interfaces/entry.interface';


const EntrySchema: Schema = new Schema({
    value: { type: Number, required: true }
  }, {
    timestamps: true
});

export default mongoose.model<IEntry & Document>('Entry', EntrySchema);
