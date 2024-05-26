import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Tiket } from "../types/tiket";
import { Jadwal } from "../types/jadwal";

import * as pesanTiketService from "../controllers/pesanTiket";
import { notifRouter } from './notifRouter';

export const pesanTiketRouter = express.Router();

pesanTiketRouter.get("/:planetariumId/:id", async (request: Request, response: Response) => {
  try {
    let tiket: Jadwal;
    tiket = await pesanTiketService.getTicketData(
      parseInt(request.params.planetariumId),
      parseInt(request.params.id)
    );
    return response.status(200).json(tiket);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }});

pesanTiketRouter.post("/", async (request: Request, response: Response) => {
  try {
    let result: Promise<string>;
    result = pesanTiketService.pesanTiket(
      request.body.namaPemesan,
      request.body.jumlahTiket,
      request.body.noTelepon,
      request.body.email,
      request.body.idJadwal,
      request.body.idPlanetarium,
      request.body.note,
      // request.body.tanggalTiket
    );
    return response.status(321).json(result);
  } catch (error) {
    return response.status(500).json(error.code);
  }
});
