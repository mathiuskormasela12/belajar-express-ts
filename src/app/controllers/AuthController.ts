import { Router, Request, Response } from 'express';
import IAuthController from './IAuthController';
import Authentication from '../utils/Authentication';

const db = require('../db/models');

class AuthController implements IAuthController {
	public async register(req: Request, res: Response): Promise<Response> {
		const { 
			username,
			password
		} = req.body;

		if(!username || !password) {
			return res.status(200).json({
				error: "False",
				message: "Form kosong"
			});
		}

		const hashed = await Authentication.passwordHash(password);

		await db.user.create({ username, password: hashed });
		return res.status(200).json({
			error: "False",
			message: "Berhasil menambah user baru"
		});
	}

	public async login(req: Request, res: Response): Promise<Response> {
		const {		
			username,
			password
		} = req.body;

		if(!username || !password) {
			return res.status(200).json({
				error: "False",
				message: "Form kosong"
			});
		}

		const user = await db.user.findOne({ where : { username  } });

		if(user) {
			const passwordSame = await Authentication.passwordCompare(password, user.password);
			
			if(!passwordSame) {
				return res.status(200).json({
					error: "False",
					message: "Password salah"
				});
			}
			
			const secret = process.env.SECRET || 'secret';
			const token = Authentication.generateToken(secret, user.id, username, password );
			return res.status(200).json({
				error: "False",
				message: "Login berhasil",
				token
			});
		} else {
			return res.status(200).send({
				error: "False",
				message: "username tidak ada"
			});
		}
	}
}

export default new AuthController();
