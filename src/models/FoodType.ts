import { Document, model, Schema } from 'mongoose';

export interface FoodType extends Document {
  name: string;
}

const foodTypeSchema: Schema = new Schema<FoodType>({
  name: {
    type: String,
    required: true,
  },
});

export const FoodType = model<FoodType>('FoodType', foodTypeSchema);
