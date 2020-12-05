"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import all modules
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
// import routes
const Pages_1 = __importDefault(require("../router/Pages"));
const Auth_1 = __importDefault(require("../router/Auth"));
class App {
    constructor() {
        dotenv_1.config();
        this.port = process.env.PORT || 3000;
        ;
        this.whiteList = ['http://127.0.0.1:3000', 'http://localhost:3000'];
        this.app = express_1.default();
        this.plugins();
        this.routes();
        this.listen();
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(morgan_1.default("dev"));
        this.app.use(compression_1.default());
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default({
            origin: (origin, callback) => {
                if (this.whiteList.indexOf(origin) != -1 || !origin)
                    callback(null, true);
                else
                    callback(new Error('Blocked by cors'));
            }
        }));
    }
    routes() {
        this.app.use('/api/v1', Pages_1.default);
        this.app.use('/api/v1', Auth_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Magic happen at http://127.0.0.1:${this.port}`);
        });
    }
}
exports.default = App;
