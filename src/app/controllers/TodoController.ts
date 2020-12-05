import { Request, Response } from 'express';

import IUserController from './IUserController';
import TodoServices from '../services/TodoServices';

let data: any[] = [
	{ id: 1, nama: 'Mathius '},
	{ id: 2, nama: 'Kiko '},
	{ id: 3, nama: 'Fadhli' }
];

class TodoController implements IUserController {
	public async index(req: Request, res: Response): Promise<Response> {
		const todoServices = new TodoServices(req);
		const results = await todoServices.getAll();
		return res.status(200).json({
			error: "False",
			message: "berhasil mengambil todo",
			results
		});
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const todoServices = new TodoServices(req);
		await todoServices.create();
		return res.send('berhasil menambah data');
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const todoServices = new TodoServices(req);
		const result = await todoServices.getOne();
		return res.status(200).json({
			error: "False",
			message: "Berhasil mengambil todo",
			result
		})
	}

	public async delete(req: Request, res: Response): Promise<Response>{
		const todoServices = new TodoServices(req);
		const message = await todoServices.delete();
		return res.status(200).json({
			message
		});
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const todoServices = new TodoServices(req);
		const message = await todoServices.update();
		return res.status(200).json({
			message
		})
	}
}

export default new TodoController();
