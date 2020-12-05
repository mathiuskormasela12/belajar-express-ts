// import all modules
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';

// import routes
import Pages from '../router/Pages';
import Auth from '../router/Auth';

class App {
	private app: Application;
	private port: any;
	private whiteList: string[];

	constructor() {
		dotenv();
		this.port = process.env.PORT || 3000;;
		this.whiteList = ['http://127.0.0.1:3000', 'http://localhost:3000'];
		this.app = express();
		this.plugins();
		this.routes();
		this.listen();
	}

	private plugins(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(morgan("dev"));
		this.app.use(compression());
		this.app.use(helmet());
		this.app.use(cors({
			origin: (origin: any, callback: any): void => {
				if(this.whiteList.indexOf(origin) != -1 || !origin)
					callback(null, true);
				else
					callback(new Error('Blocked by cors'))
			}
		}));
	}

	private routes(): void {
		this.app.use('/api/v1', Pages);
		this.app.use('/api/v1', Auth);
	}

	private listen(): void {
		this.app.listen(this.port, () => {
			console.log(`Magic happen at http://127.0.0.1:${this.port}`);
		});
	}
}

export default App;
