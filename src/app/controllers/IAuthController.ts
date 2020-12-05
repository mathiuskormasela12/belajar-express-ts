import { Request, Response } from 'express'

export default interface IAuthController {
	register(req: Request, res: Response): Promise<Response>;
	login(req: Request, res: Response): Promise<Response>;
}
