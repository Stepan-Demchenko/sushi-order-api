"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const ordersSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Food',
            required: true,
        },
    ],
});
exports.Order = mongoose_1.model('Order', ordersSchema);
