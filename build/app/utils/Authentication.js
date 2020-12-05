"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
    static passwordHash(password) {
        return bcryptjs_1.default.hash(password, 8);
    }
    static passwordCompare(password, hash) {
        return bcryptjs_1.default.compare(password, hash);
    }
    static generateToken(secret, id, username, password) {
        return jsonwebtoken_1.default.sign({ id, username, password }, secret, {
            expiresIn: 60 * 60
        });
    }
}
exports.default = Authentication;
