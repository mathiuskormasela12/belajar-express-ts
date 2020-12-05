import { Router } from 'express';

import IRoutes from './IRoutes';

abstract class Routes implements IRoutes {
	protected router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	public abstract routes(): void;
}

export default Routes;
