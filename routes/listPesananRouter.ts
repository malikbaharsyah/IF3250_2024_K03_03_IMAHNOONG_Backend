import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DetailPesanan, Pesanan } from "../types/pesanan";

import * as pesananService from "../controllers/request"

export const pesananRouter = express.Router();

pesananRouter.post("/pesanan/listPesanan", async (request: Request, response: Response) => {
    try {
        let pesanan: Pesanan[];
        pesanan = await pesananService.getListPesananByPlanetariumId(parseInt(request.body.id));
        return response.status(200).json(pesanan);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

pesananRouter.post("/pesanan/detailPesanan", async (request: Request, response: Response) => {
    try {
        let pesanan: DetailPesanan;
        let id = /^\d+$/.test(request.body.id) ? parseInt(request.body.id) : request.body.id
        pesanan = await pesananService.getPesananById(id);
        return response.status(200).json(pesanan);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
})