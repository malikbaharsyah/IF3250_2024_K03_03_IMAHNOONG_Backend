import express from "express";
import type { Request, Response } from "express";
import { CustomRequest } from "../middlewares/auth";

import * as authService from "../middlewares/auth"

export const authRouter = express.Router();

authRouter.get("/", authService.authToken, async (request: Request, response: Response) => {
    try {
        const res = {
            "username" : (request as CustomRequest).username,
            "idPlanetarium" : (request as CustomRequest).idPlanetarium
        }
        return response.status(200).json(res);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})