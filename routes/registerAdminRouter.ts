/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Admin } from "../types/admin";

import * as adminService from "../controllers/admin"
import { authToken, CustomRequest } from "../middlewares/auth";

export const registerAdminRouter = express.Router();

registerAdminRouter.post("/", authToken, async (request: Request, response: Response) => {
    try {
        const isSuperAdmin = (request as CustomRequest).isSuperAdmin;
        if (!isSuperAdmin) {
            return response.status(401).json("Unauthorized");
        }
        const admin = await adminService.createAdmin(request.body.username, request.body.password, request.body.email);
        return response.status(200).json(admin);
    } catch (error: any) {
        if (error === "Username already exists") {
            return response.status(400).json(error);
        }
        return response.status(500).json(error.message);
    }
})