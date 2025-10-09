import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token ausente' });
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET não definido');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        console.error('Erro no middleware:', error);
        res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};
