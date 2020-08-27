"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const order_1 = __importDefault(require("./routes/order"));
const category_1 = __importDefault(require("./routes/category"));
const position_1 = __importDefault(require("./routes/position"));
const passport_2 = require("./middleware/passport");
const app = express_1.default();
mongoose_1.default
    .connect('mongodb://localhost:27017/node-app')
    .then(() => console.log('connected to DB'))
    .catch((e) => console.log(e));
app.use(passport_1.default.initialize());
passport_2.middleware(passport_1.default);
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.use('/api/auth', auth_1.default);
app.use('/api/order', order_1.default);
app.use('/api/category', category_1.default);
app.use('/api/position', position_1.default);
app.use('/api/uploads', express_1.default.static(process.cwd() + '/uploads'));
exports.default = app;
