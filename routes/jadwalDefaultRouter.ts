import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Jadwal, JadwalCatalog } from "../types/jadwal";

export const jadwalDefaultRouter = express.Router();
import * as jadwalDefaultService from "../controllers/jadwalDefaultController"

jadwalDefaultRouter.get("/landingPage/catalog", async (request: Request, response: Response) => {
    try {
        let jadwal: JadwalCatalog[];

        jadwal = await jadwalDefaultService.getCatalogDefault();
        return response.status(200).json(jadwal);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});