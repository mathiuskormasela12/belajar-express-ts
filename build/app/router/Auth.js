"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = __importDefault(require("../core/Routes"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const validatedMiddleware_1 = __importDefault(require("../middleware/validatedMiddleware"));
class Auth extends Routes_1.default {
    routes() {
        this.router.post('/register', validatedMiddleware_1.default, AuthController_1.default.register);
        this.router.post('/login', validatedMiddleware_1.default, AuthController_1.default.login);
    }
    get getRouter() {
        return this.router;
    }
}
exports.default = new Auth().getRouter;
