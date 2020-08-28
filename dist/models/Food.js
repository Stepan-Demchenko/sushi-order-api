"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const mongoose_1 = require("mongoose");
const foodSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Ingredient',
        },
    ],
});
exports.Food = mongoose_1.model('Food', foodSchema);
