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
exports.middleware = void 0;
const passport_jwt_1 = require("passport-jwt");
const mongoose_1 = require("mongoose");
const keys_1 = __importDefault(require("../config/keys"));
const User = mongoose_1.model('User');
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys_1.default.jwtKey,
};
function middleware(passport) {
    passport.use(new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User.findById(payload.userId).select('email id');
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        catch (e) {
            console.warn(e);
        }
    })));
}
exports.middleware = middleware;
