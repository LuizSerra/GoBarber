import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw Error('Token is missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decode = verify(token, authConfig.jwt.secret);

        const { sub } = decode as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw Error('Invalid JWT Token.');
    }
}
