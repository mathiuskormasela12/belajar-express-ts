import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class Authentication {
	public static passwordHash(password: string): Promise<string> {
		return bcrypt.hash(password, 8);
	}

	public static passwordCompare(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}

	public static generateToken(secret: string, id: number, username: string, password: string): string {
		return jwt.sign({ id, username, password }, secret, {
			expiresIn: 60 * 60
		});
	}
}

export default Authentication;
