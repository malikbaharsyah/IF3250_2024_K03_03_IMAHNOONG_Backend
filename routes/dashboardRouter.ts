import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DetailPesanan, Pesanan } from "../types/pesanan";

import * as dashboardService from "../controllers/dashboard"
import { authToken } from "../middlewares/auth";

export const dashboardRouter = express.Router();

dashboardRouter.post("/listPesananHariIni", authToken, async (request: Request, response: Response) => {
    try {
        let pesanan: Pesanan[];
        console.log(request.body.id)
        pesanan = await dashboardService.getPesananHariIni(parseInt(request.body.id));
        return response.status(200).json(pesanan);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

dashboardRouter.get("/statistik/:pid/:month/:year", async (request: Request, response: Response) => {
    try {
        let statistic: number[];
        statistic = await dashboardService.getStatisticData(parseInt(request.params.pid), parseInt(request.params.month), parseInt(request.params.year));
        return response.status(200).json(statistic);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});