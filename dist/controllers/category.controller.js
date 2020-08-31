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
exports.update = exports.create = exports.remove = exports.getById = exports.getAll = void 0;
const Category_1 = require("../models/Category");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield Category_1.Category.find({ user: req.body.user.id });
            res.status(200).json(categories);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.getAll = getAll;
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield Category_1.Category.findById({ _id: req.params.id });
            res.status(200).json(category);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.getById = getById;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Category_1.Category.remove({ _id: req.params.id });
            res.status(200).json({ message: 'Removed' });
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.remove = remove;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = new Category_1.Category({
            name: req.body.name,
            user: req.body.user.id,
            imageSrc: req.file ? req.file.path : '',
        });
        try {
            yield category.save();
            res.status(200).json({
                message: 'OK',
            });
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.create = create;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const updated = {
            name: req.body.name,
            user: req.body.user.id,
            imageSrc: req.file ? req.file.path : '',
        };
        try {
            const position = yield Category_1.Category.findOneAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true });
            res.status(200).json(position);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.update = update;
