import 'dotenv/config'
import jwt, { JwtPayload } from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const generateAccessToken = async (username: string): Promise<string> => {
    return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1d' })
}

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
   
      if (!token) {
        res.status(403).send('Invalid token');
      }
   
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
      (req as CustomRequest).token = decoded;
   
      next();
    } catch (err) {
      res.status(401).send('Authentication failed');
    }
};