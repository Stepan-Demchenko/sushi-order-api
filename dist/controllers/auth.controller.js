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
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/users/User");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const candidate = yield User_1.User.findOne({
            email: req.body.email,
        });
        if (candidate) {
            const passwordResult = bcryptjs_1.default.compareSync(req.body.password, candidate.password);
            if (passwordResult) {
                const token = jsonwebtoken_1.default.sign({
                    email: candidate.email,
                    userId: candidate._id,
                }, 'dev-jwt', { expiresIn: 60 * 60 });
                res.status(200).json({
                    token: `Bearer ${token}`,
                });
            }
            else {
                res.status(401).json({
                    message: 'Invalid password or email',
                });
            }
        }
        else {
            res.status(404).json({
                message: 'Can`t find user',
            });
        }
    });
}
exports.login = login;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const candidate = yield User_1.User.findOne({ email: req.body.email });
        if (candidate) {
            res.status(409).json({
                message: 'User already exist',
            });
        }
        else {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const password = req.body.password;
            const user = new User_1.User({
                email: req.body.email,
                password: bcryptjs_1.default.hashSync(password, salt),
            });
            try {
                yield user.save();
                const { _id, email } = yield User_1.User.findOne({ email: req.body.email });
                const token = jsonwebtoken_1.default.sign({
                    email: email,
                    userId: _id,
                }, 'dev-jwt', { expiresIn: 60 * 60 });
                res.status(201).json({
                    token: `Bearer ${token}`,
                });
            }
            catch (e) {
                errorHandler_1.default(res, e);
            }
        }
    });
}
exports.register = register;
