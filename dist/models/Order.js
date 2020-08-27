"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ordersSchema = new mongoose_1.Schema({
    user: {
        ref: 'users',
        type: mongoose_1.Schema.Types.ObjectId
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
exports.default = mongoose_1.model("orders", ordersSchema);
