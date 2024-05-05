import express from "express";
import type { Request, Response } from "express";

import * as adminService from "../controllers/admin"
import * as authService from "../middlewares/auth"

export const loginRouter = express.Router();

loginRouter.post("/", async (request: Request, response: Response) => {
    try {
        let admin = await adminService.checkAdmin(request.body.username, request.body.password);
        if (!admin) {
            return response.status(400).json({ error: "Invalid username or password" });
        }
        const idPlanetarium = await adminService.getPlanetariumId(request.body.username);
        const token = await authService.generateAccessToken(request.body.username, idPlanetarium);
        return response.status(200).json({ token: token });
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})

export const logoutRouter = express.Router();
logoutRouter.delete("/", authService.authToken, async (request: Request, response: Response) => {
    try {
        return response.status(200).json("success");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})