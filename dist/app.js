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
const auth_1 = __importDefault(require("./routes/auth"));
const category_1 = __importDefault(require("./routes/category"));
const passport_2 = require("./middleware/passport");
const app = express_1.default();
const port = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log(`server has benn started on ${port}`);
});
mongoose_1.default
    .connect('mongodb://localhost:27017/node-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to DB'))
    .catch((e) => console.log(e));
app.use(passport_1.default.initialize());
passport_2.middleware(passport_1.default);
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: true }));
// parse application/json
app.use(express_1.default.json());
app.use('/api/auth', auth_1.default);
app.use('/api/category', category_1.default);
app.use('/api/uploads', express_1.default.static(process.cwd() + '/uploads'));
