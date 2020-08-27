import {Schema, model} from "mongoose";

const ordersSchema = new Schema({
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    list: [{
        name: {
            type: String
        },
        quantity: {
            type: Number
        },
        cost: {
            type: Number
        }
    }]
});

export default model<any>("orders", ordersSchema);
