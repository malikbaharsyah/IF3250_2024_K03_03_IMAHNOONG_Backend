import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Jadwal, JadwalCatalog } from "../types/jadwal";

export const jadwalRouter = express.Router();
import * as jadwalService from "../controllers/jadwalController"

jadwalRouter.get("/viewJadwal/:jadwalId", async (request: Request, response: Response) => {
    try {

        const { jadwalId } = request.params;
        const parsedJadwalId = parseInt(jadwalId, 10);

        let jadwal: Jadwal;
        jadwal = await jadwalService.getjadwalById(parsedJadwalId);
        
        if (!jadwal) {
            return response.status(404).json({ error: "Jadwal not found" });
        }

        return response.status(200).json(jadwal);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

jadwalRouter.get("/landingPage/event", async (request: Request, response: Response) => {
    try {
        let jadwal: Jadwal[];

        jadwal = await jadwalService.getjadwal();
        return response.status(200).json(jadwal);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});


jadwalRouter.get("/landingPage/catalog/:page", async (request: Request, response: Response) => {
    try {
        const { page } = request.params;
        const parsedPage = parseInt(page, 10);
        let jadwal: JadwalCatalog[];

        jadwal = await jadwalService.getCatalog(parsedPage);
        return response.status(200).json(jadwal);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});


jadwalRouter.get("/listjadwal/:date", async (request: Request, response: Response) => {
    try {
        const { date } = request.params;
        const searchDate = new Date(`${date}T00:00:00.000Z`);

        searchDate.setHours(searchDate.getHours() - 7);

        
        let jadwal: Jadwal[];

        jadwal = await jadwalService.getListJadwal(searchDate);
        return response.status(200).json(jadwal);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});