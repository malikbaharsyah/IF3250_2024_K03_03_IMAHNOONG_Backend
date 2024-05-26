import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DetailPesanan, Pesanan } from "../types/pesanan";
import { CustomRequest, authToken } from "../middlewares/auth";
import * as pesananService from "../controllers/request";

export const pesananRouter = express.Router();

pesananRouter.get(
  "/listPesanan/:planetariumId/:cat", authToken,
  async (request: Request, response: Response) => {
    try {
      const { planetariumId, cat } = request.params;
      if (parseInt((request as CustomRequest).idPlanetarium) !== parseInt(planetariumId)) {
        return response.status(403).json("Unauthorized");
      }
      let isDefault: boolean | null;
      if (cat === "all") {
        isDefault = null;
      } else if (cat === "reguler") {
        isDefault = true;
      } else if (cat === "request") {
        isDefault = false;
      }
      let pesanan: Pesanan[];
      pesanan = await pesananService.getListPesananByPlanetariumId(
        parseInt(planetariumId),
        isDefault
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
      let parsedId = /^\d+$/.test(idPesanan) ? parseInt(idPesanan) : idPesanan;
      pesanan = await pesananService.getPesananById(parsedId);
      return response.status(200).json(pesanan);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);
