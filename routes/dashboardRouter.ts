import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DetailPesanan, Pesanan } from "../types/pesanan";

import * as dashboardService from "../controllers/dashboard"

export const dashboardRouter = express.Router();

dashboardRouter.post("/dashboard/listPesananHariIni", async (request: Request, response: Response) => {
    try {
        let pesanan: Pesanan[];
        pesanan = await dashboardService.getPesananHariIni(parseInt(request.body.id));
        return response.status(200).json(pesanan);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});