import { Document, model, Schema } from 'mongoose';

export interface Role extends Document {
  name: string;
}

const roleSchema: Schema = new Schema({
  roleName: {
    type: String,
    required: true,
  },
});

export const Role = model<Role>('Role', roleSchema);
