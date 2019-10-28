const mogoose = require('mongoose');
const Schema = mogoose.Schema;

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
module.exports = mogoose.model('orders', ordersSchema);
