import { Document, Schema, model } from 'mongoose';
import { Role } from './Role';

export interface User extends Document {
  email: string;
  password: string;
  role: Role['_id'];
  avatar: string;
}

const userSchema: Schema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
  avatar: {
    type: String,
    default: '',
  },
});

export const User = model<User>('User', userSchema);
