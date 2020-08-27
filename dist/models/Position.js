"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const positionsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    category: {
        ref: 'categories',
        type: mongoose_1.Schema.Types.ObjectId,
    },
    user: {
        ref: 'users',
        type: mongoose_1.Schema.Types.ObjectId,
    },
});
exports.default = mongoose_1.model('positions', positionsSchema);
