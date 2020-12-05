import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): any => {
	const token = req.body.token || req.query.token || req.headers['token'];
	const secret = process.env.SECRET || 'secret';

	if(token) {
		try {
			const result = jwt.verify(token, secret);
			req.app.locals.token = result;	
			return next();
		} catch(err) {
			if(String(err).includes('jwt expired')) {
				return res.status(400).json({
					error: "True",
					message: "Token sudah expire"
				});
			} else {
				console.log(err);
				return res.status(400).json({
					error: "True",
					message: "Token salah"
				});	
			}
		}
	} else {
		return res.status(400).json({
			error: "True",
			message: "Tidak ada token"
		});
	}
}
