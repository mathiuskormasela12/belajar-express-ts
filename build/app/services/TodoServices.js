"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/models');
class TodoServices {
    constructor(req) {
        this.token = req.app.locals.token;
        this.params = req.params;
        this.body = req.body;
    }
    async create() {
        const { description } = this.body;
        const { id: user_id } = this.token;
        await db.todo.create({ user_id, description });
        return true;
    }
    async getAll() {
        const { id: user_id } = this.token;
        const results = await db.todo.findAll({
            where: { user_id },
            attributes: ['id', 'user_id', 'description']
        });
        return results;
    }
    async getOne() {
        const { id: user_id } = this.token;
        const { id } = this.params;
        const result = await db.todo.findOne({
            where: { user_id, id },
            attributes: ['id', 'user_id', 'description']
        });
        return result;
    }
    async delete() {
        const { id: user_id } = this.token;
        const { id } = this.params;
        const result = await db.todo.destroy({
            where: { user_id, id }
        });
        console.log(result);
        return 'Berhasil menghapus';
    }
    async update() {
        const { id: user_id } = this.token;
        const { id } = this.params;
        const { description } = this.body;
        try {
            const result = await db.todo.update({
                description
            }, {
                where: { id, user_id }
            });
            return 'berhasil mengupdate data';
        }
        catch (err) {
            console.log(err);
            return 'gagal';
        }
    }
}
exports.default = TodoServices;
