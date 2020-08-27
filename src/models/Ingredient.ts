import { Document, model, Schema } from 'mongoose';

export interface Ingredient extends Document {
  title: string;
  img: string;
}

const ingredientSchema: Schema = new Schema<Ingredient>({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

export const Ingredient = model<Ingredient>('Ingredient', ingredientSchema);
