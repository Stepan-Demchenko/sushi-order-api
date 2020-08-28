"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
const mongoose_1 = require("mongoose");
const ingredientSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
});
exports.Ingredient = mongoose_1.model('Ingredient', ingredientSchema);
