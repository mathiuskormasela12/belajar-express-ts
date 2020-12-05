"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['token'];
    const secret = process.env.SECRET || 'secret';
    if (token) {
        try {
            const result = jsonwebtoken_1.default.verify(token, secret);
            req.app.locals.token = result;
            return next();
        }
        catch (err) {
            if (String(err).includes('jwt expired')) {
                return res.status(400).json({
                    error: "True",
                    message: "Token sudah expire"
                });
            }
            else {
                console.log(err);
                return res.status(400).json({
                    error: "True",
                    message: "Token salah"
                });
            }
        }
    }
    else {
        return res.status(400).json({
            error: "True",
            message: "Tidak ada token"
        });
    }
};
exports.auth = auth;
