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
exports.create = exports.getAll = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const Order_1 = __importDefault(require("../models/Order"));
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            user: req.user.id,
        };
        if (req.query.start) {
            query.date = {
                //боьше или равно
                $gte: req.query.start,
            };
        }
        if (req.query.end) {
            if (!query.date) {
                query.date = {};
            }
            query.date['$lte'] = req.query.end;
        }
        if (req.query.order) {
            query.order = +req.query.order;
        }
        try {
            const orders = yield Order_1.default.find(query)
                .sort({ date: -1 })
                .skip(+req.query.offset)
                .limit(+req.query.limit);
            res.status(200).json(orders);
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.getAll = getAll;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lastOrder = yield Order_1.default.findOne({ user: req.user.id }).sort({ date: -1 });
            const maxOrder = lastOrder ? lastOrder.order : 0;
            yield new Order_1.default({
                list: req.body.list,
                user: req.user.id,
                order: maxOrder + 1,
            }).save();
            res.status(201).json({
                message: 'Ok',
            });
        }
        catch (e) {
            errorHandler_1.default(res, e);
        }
    });
}
exports.create = create;
