"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Routes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
}
exports.default = Routes;
