"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const upload_1 = require("../middleware/upload");
const controller = __importStar(require("../controllers/category.controller"));
const router = express_1.default.Router();
router.get('/', passport_1.default.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', passport_1.default.authenticate('jwt', { session: false }), controller.getById);
router.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), controller.remove);
router.post('/', passport_1.default.authenticate('jwt', { session: false }), upload_1.upload.single('image'), controller.create);
router.patch('/:id', passport_1.default.authenticate('jwt', { session: false }), upload_1.upload.single('image'), controller.update);
exports.default = router;
