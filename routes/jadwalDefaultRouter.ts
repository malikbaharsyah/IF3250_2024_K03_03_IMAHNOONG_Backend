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

jadwalDefaultRouter.get("/listjadwal/:id/:date", async (request: Request, response: Response) => {
    try {
        const { id, date } = request.params;
        // console.log(date);
        const searchDate = new Date(`${date}T00:00:00.000Z`);

        searchDate.setHours(searchDate.getHours() - 7);

        
        let jadwal: Jadwal[];

        jadwal = await jadwalDefaultService.getListJadwal(id, searchDate);
        return response.status(200).json(jadwal);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});