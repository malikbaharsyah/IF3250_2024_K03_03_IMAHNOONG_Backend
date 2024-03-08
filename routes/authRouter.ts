import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Admin } from "../types/admin";

import * as adminService from "../controllers/admin"
import * as authService from "../middlewares/auth"

export const authRouter = express.Router();

authRouter.post("/", authService.authToken, async (request: Request, response: Response) => {
    try {
        return response.status(200).json("success");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})