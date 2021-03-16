import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }, {
    timestamps: true
});


/**
 * Has password before persisting the new model.
 */
UserSchema.pre<IUser & Document>('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;

    bcrypt.hash(
      document.password, saltRounds,
      function(err: any, hashedPassword: string) {
        if (err) {
          next(err);
        }
        else {
          document.password = hashedPassword;
          next();
        }
      }
    );
  } else {
    next();
  }
});

/**
 * Helper function to check password validity.
 * @param password 
 * @param callback 
 */
UserSchema.methods.isCorrectPassword = function(password, callback){
  const self = this as (IUser & Document);
  return bcrypt.compare(password, self.password);
}


type UserFunctions = {
  isCorrectPassword: () => Promise<boolean>
};

export default mongoose.model<IUser & Document & UserFunctions>('User', UserSchema);

