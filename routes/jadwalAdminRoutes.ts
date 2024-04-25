import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { JadwalAdminSorted } from "../types/jadwal";
import * as jadwalAdminService from "../controllers/jadwalAdmin";

export const detailsRouter = express.Router();

detailsRouter.get("/:id", async (request: Request, response: Response) => {
    try {
        let listJadwal: JadwalAdminSorted[];
        listJadwal = await jadwalAdminService.getListJadwal(parseInt(request.params.id));
        return response.status(200).json(listJadwal);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
}) 