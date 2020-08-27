"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        ref: 'users',
        type: mongoose_1.Schema.Types.ObjectId
    },
    imageSrc: {
        type: String,
        default: ''
    }
});
exports.default = mongoose_1.model("categories", categorySchema);
