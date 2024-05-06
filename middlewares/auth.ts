import 'dotenv/config'
import jwt, { JwtPayload } from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
    username: string;
    idPlanetarium: string;
}

export const generateAccessToken = async (username: string, idPlanetarium: number): Promise<string> => {
    return jwt.sign({ username, idPlanetarium }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1d' })
}

export const authToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(403).send('Invalid token');
      }
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
      (req as CustomRequest).username = decoded.username;
      (req as CustomRequest).idPlanetarium = decoded.idPlanetarium;
      next();
    } catch (err) {
      return res.status(401).send('Authentication failed');
    }
};