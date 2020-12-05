import { Router, Request, Response } from 'express';
import Routes from '../core/Routes';
import AuthController from '../controllers/AuthController';
import validatedMiddleware from '../middleware/validatedMiddleware';

class Auth extends Routes {
	public routes(): void {
		this.router.post('/register', validatedMiddleware, AuthController.register);
		this.router.post('/login', validatedMiddleware, AuthController.login);
	}

	public get getRouter(): Router {
		return this.router;
	}
}

export default new Auth().getRouter;
