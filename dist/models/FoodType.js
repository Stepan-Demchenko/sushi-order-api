"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodType = void 0;
const mongoose_1 = require("mongoose");
const foodTypeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
});
exports.FoodType = mongoose_1.model('FoodType', foodTypeSchema);
