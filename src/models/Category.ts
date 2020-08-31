import { Document, model, Schema } from 'mongoose';

export interface Category extends Document {
    name: string;
}

const categorySchema: Schema = new Schema<Category>({
    name: {
        type: String,
        required: true,
    },
});

export const Category = model<Category>('Category', categorySchema);

