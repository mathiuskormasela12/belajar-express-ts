"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TodoServices_1 = __importDefault(require("../services/TodoServices"));
let data = [
    { id: 1, nama: 'Mathius ' },
    { id: 2, nama: 'Kiko ' },
    { id: 3, nama: 'Fadhli' }
];
class TodoController {
    async index(req, res) {
        const todoServices = new TodoServices_1.default(req);
        const results = await todoServices.getAll();
        return res.status(200).json({
            error: "False",
            message: "berhasil mengambil todo",
            results
        });
    }
    async create(req, res) {
        const todoServices = new TodoServices_1.default(req);
        await todoServices.create();
        return res.send('berhasil menambah data');
    }
    async show(req, res) {
        const todoServices = new TodoServices_1.default(req);
        const result = await todoServices.getOne();
        return res.status(200).json({
            error: "False",
            message: "Berhasil mengambil todo",
            result
        });
    }
    async delete(req, res) {
        const todoServices = new TodoServices_1.default(req);
        const message = await todoServices.delete();
        return res.status(200).json({
            message
        });
    }
    async update(req, res) {
        const todoServices = new TodoServices_1.default(req);
        const message = await todoServices.update();
        return res.status(200).json({
            message
        });
    }
}
exports.default = new TodoController();
