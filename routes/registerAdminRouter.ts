/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Admin } from "../types/admin";

import * as adminService from "../controllers/admin"

export const registerAdminRouter = express.Router();

registerAdminRouter.post("/", async (request: Request, response: Response) => {
    try {
        let admin = await adminService.createAdmin(request.body.username, request.body.password, request.body.email);
        return response.status(200).json(admin);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})