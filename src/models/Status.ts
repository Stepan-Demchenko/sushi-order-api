import { Schema, model, Document } from 'mongoose';

export interface Status extends Document {
  name: string;
}
