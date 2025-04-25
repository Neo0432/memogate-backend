import jwt from 'jsonwebtoken';
import {NextFunction, Response, Request} from "express";

export const parseTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) { res.status(401).json({error: 'Token is not provided'}); return; }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
        if (typeof decoded === 'object' && 'id' in decoded) {
            req.user = {
                id: decoded.id as string,
                email: decoded.email as string | undefined,
            };
        }
        next();
    } catch (error) {
        res.status(401).json({error: 'Token is invalid'});
    }
}