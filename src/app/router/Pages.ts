import { Router } from 'express';
import Routes from '../core/Routes';

// import all controllers
import TodoController from '../controllers/TodoController';

import * as authMiddleware from '../middleware/authMiddleware';
import todoValidator from '../middleware/todoValidator';

class Pages extends Routes {
	public routes(): void {
		this.router.get('/todo', authMiddleware.auth, TodoController.index);
		this.router.post('/todo', authMiddleware.auth, todoValidator, TodoController.create);
		this.router.get('/todo/:id', authMiddleware.auth, TodoController.show);
		this.router.put('/todo/:id', authMiddleware.auth, todoValidator, TodoController.update);
		this.router.delete('/todo/:id', authMiddleware.auth, TodoController.delete);
	}

	public get getRouter(): Router {
		return this.router;
	}
}

export default new Pages().getRouter;
