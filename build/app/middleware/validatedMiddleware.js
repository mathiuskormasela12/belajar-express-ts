"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validatedMiddleware = [
    express_validator_1.check('username').isString(),
    express_validator_1.check('password').isLength({ min: 6 }),
    (req, res, next) => {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                errors: "False",
                message: errors.array()
            });
        }
        next();
    }
];
exports.default = validatedMiddleware;
