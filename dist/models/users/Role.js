"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    roleName: {
        type: String,
        required: true,
    },
});
exports.Role = mongoose_1.model('Role', roleSchema);
