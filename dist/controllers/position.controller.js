"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.remove = exports.create = exports.getByCategoryId = void 0;
const Position_1 = __importDefault(require("../models/Position"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
function getByCategoryId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const positions = yield Position_1.default.find({
                category: req.params.categoryId,
                user: req.user.id,
            });
            res.status(200).json(positions);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.getByCategoryId = getByCategoryId;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const position = yield new Position_1.default({
                name: req.body.name,
                cost: req.body.cost,
                category: req.body.category,
                user: req.user.id,
            }).save();
            res.status(201).json(position);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.create = create;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Position_1.default.remove({ _id: req.params.id });
            res.status(200).json({ message: 'OK' });
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.remove = remove;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const position = yield Position_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
            res.status(200).json(position);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.update = update;
