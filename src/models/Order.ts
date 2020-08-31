import { Schema, model, Document } from 'mongoose';

interface Client {
  phone: string;
  email?: string;
  name: string;
}

export interface Order extends Document {
  client: Client;
  date: Date;
  order: number[];
}

const ordersSchema = new Schema<Order>({
  client: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  order: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food',
      required: true,
    },
  ],
});

export const Order = model<Order>('Order', ordersSchema);
