import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw Error('incorrect email/password combination.');
        }
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw Error('incorrect email/password combination.');
        }

        const token = sign({}, 'f39dc6f2b2a74991efa9307daa0a9072', {
            subject: user.id,
            expiresIn: '1d',
        });

        return { user, token };
    }
}
export default AuthenticateUserService;
