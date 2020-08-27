import { Schema, model, Document } from 'mongoose';
import { Ingredient } from './Ingredient';
import { FoodType } from './FoodType';

export interface Food extends Document {
  title: string;
  price: number;
  weight: number;
  img: string;
  description: string;
  typeOfFood: FoodType['_id'];
  ingredients: Ingredient['_id'];
}

const foodSchema: Schema = new Schema({
  title: {
    type: String,
    maxlength: 42,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  typeOfFood: {
    type: Schema.Types.ObjectId,
    ref: 'FoodType',
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
  ],
});

export const Food = model<Food>('Food', foodSchema);
