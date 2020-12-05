"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = __importDefault(require("../utils/Authentication"));
const db = require('../db/models');
class AuthController {
    async register(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(200).json({
                error: "False",
                message: "Form kosong"
            });
        }
        const hashed = await Authentication_1.default.passwordHash(password);
        await db.user.create({ username, password: hashed });
        return res.status(200).json({
            error: "False",
            message: "Berhasil menambah user baru"
        });
    }
    async login(req, res) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(200).json({
                error: "False",
                message: "Form kosong"
            });
        }
        const user = await db.user.findOne({ where: { username } });
        if (user) {
            const passwordSame = await Authentication_1.default.passwordCompare(password, user.password);
            if (!passwordSame) {
                return res.status(200).json({
                    error: "False",
                    message: "Password salah"
                });
            }
            const secret = process.env.SECRET || 'secret';
            const token = Authentication_1.default.generateToken(secret, user.id, username, password);
            return res.status(200).json({
                error: "False",
                message: "Login berhasil",
                token
            });
        }
        else {
            return res.status(200).send({
                error: "False",
                message: "username tidak ada"
            });
        }
    }
}
exports.default = new AuthController();
