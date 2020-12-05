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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = __importDefault(require("../core/Routes"));
// import all controllers
const TodoController_1 = __importDefault(require("../controllers/TodoController"));
const authMiddleware = __importStar(require("../middleware/authMiddleware"));
const todoValidator_1 = __importDefault(require("../middleware/todoValidator"));
class Pages extends Routes_1.default {
    routes() {
        this.router.get('/todo', authMiddleware.auth, TodoController_1.default.index);
        this.router.post('/todo', authMiddleware.auth, todoValidator_1.default, TodoController_1.default.create);
        this.router.get('/todo/:id', authMiddleware.auth, TodoController_1.default.show);
        this.router.put('/todo/:id', authMiddleware.auth, todoValidator_1.default, TodoController_1.default.update);
        this.router.delete('/todo/:id', authMiddleware.auth, TodoController_1.default.delete);
    }
    get getRouter() {
        return this.router;
    }
}
exports.default = new Pages().getRouter;
