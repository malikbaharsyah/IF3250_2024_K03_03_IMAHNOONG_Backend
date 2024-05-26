/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Planetarium } from "../types/planetarium";

import * as catalogService from "../controllers/catalog";
import { authToken, CustomRequest } from "../middlewares/auth";

export const catalogRouter = express.Router();

catalogRouter.get("/", async (request: Request, response: Response) => {
  try {
    let catalog: Planetarium[];
    catalog = await catalogService.getCatalog();
    return response.status(200).json(catalog);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

catalogRouter.post("/", authToken, async (request: Request, response: Response) => {
  try {
    const isSuperAdmin = (request as CustomRequest).isSuperAdmin;
    if (!isSuperAdmin) {
      return response.status(401).json("Unauthorized");
    }
    const data = {
      namaPlanetarium: request.body.namaPlanetarium,
      deskripsi: "",
      prosedurPendaftaran: "",
      tataTertib: "",
      noTelepon: "",
      imagePath: [],
      lokasi: "",
    }
    const planetarium = await catalogService.createPlanetarium(
      data.namaPlanetarium,
      data.deskripsi,
      data.prosedurPendaftaran,
      data.tataTertib,
      data.noTelepon,
      data.imagePath,
      data.lokasi)
    return response.status(200).json(planetarium);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});