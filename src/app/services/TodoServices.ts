import { Request } from 'express';
const db  = require('../db/models');

class TodoServices {
  private params: Request['params'];
  private body: Request['body'];
  private token: { id: number };

  constructor(req: Request) {
    this.token  = req.app.locals.token;
    this.params = req.params;
    this.body   = req.body;
  }

  public async create(): Promise<boolean> {
    const { description } = this.body;
    const { id: user_id } = this.token;

    await db.todo.create({ user_id, description });
    return true;
  }

  public async getAll(): Promise<object> {
    const { id: user_id }= this.token;

    const results = await db.todo.findAll({
      where: { user_id },
      attributes: ['id', 'user_id', 'description']
    });

    return results;
  }

  public async getOne(): Promise<object> {
    const { id: user_id } = this.token;
    const { id } = this.params;

    const result = await db.todo.findOne({
      where: { user_id, id },
      attributes: ['id', 'user_id', 'description']
    });

    return result;
  }

  public async delete(): Promise<string> {
    const { id: user_id } = this.token;
    const { id } = this.params;

    const result = await db.todo.destroy({
      where: { user_id, id }
    })
    console.log(result);

    return 'Berhasil menghapus';
  }

  public async update(): Promise<string> {
    const { id: user_id } = this.token;
    const { id } = this.params;
    const { description } = this.body;
    try {
      const result = await db.todo.update({
        description
      },{
        where: { id, user_id }
      });
      
      return 'berhasil mengupdate data';  
    } catch(err) {
      console.log(err);
      return 'gagal';
    }
  }
}
export default TodoServices;
