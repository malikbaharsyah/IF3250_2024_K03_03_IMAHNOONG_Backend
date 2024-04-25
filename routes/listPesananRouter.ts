import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DetailPesanan, Pesanan } from "../types/pesanan";

import * as pesananService from "../controllers/request";

export const pesananRouter = express.Router();

pesananRouter.get(
  "/listPesanan/:planetariumId",
  async (request: Request, response: Response) => {
    try {
      const { idPlanetarium } = request.params;
      let pesanan: Pesanan[];
      pesanan = await pesananService.getListPesananByPlanetariumId(
        parseInt(idPlanetarium)
      );
      return response.status(200).json(pesanan);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

pesananRouter.get(
  "/detailPesanan/:idPesanan",
  async (request: Request, response: Response) => {
    try {
      const { idPesanan } = request.params;
      let pesanan: DetailPesanan;
      let parsedId = /^\d+$/.test(idPesanan)
        ? parseInt(idPesanan)
        : idPesanan;
      pesanan = await pesananService.getPesananById(parsedId);
      return response.status(200).json(pesanan);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
