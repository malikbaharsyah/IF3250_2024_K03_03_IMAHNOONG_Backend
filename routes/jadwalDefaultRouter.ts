import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Jadwal, JadwalCatalog } from "../types/jadwal";

export const jadwalRouter = express.Router();
import * as jadwalService from "../controllers/jadwalDefaultController"

jadwalRouter.get("/landingPage/catalog", async (request: Request, response: Response) => {
    try {
        let jadwal: JadwalCatalog[];

        jadwal = await jadwalService.getCatalog();
        return response.status(200).json(jadwal);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});