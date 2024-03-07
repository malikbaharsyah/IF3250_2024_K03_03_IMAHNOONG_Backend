import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Tiket } from "../types/tiket";

import * as pesanTiketService from "../controllers/pesanTiket";

export const pesanTiketRouter = express.Router();

pesanTiketRouter.post("/", async (request: Request, response: Response) => {
  try {
    let result: Promise<string>;
    let stokSufficient: Promise<string>;
    stokSufficient = pesanTiketService.cekStok(
      request.body.jumlahTiket,
      request.body.idJadwal
    );
    if (stokSufficient) {
      result = pesanTiketService.pesanTiket(
        request.body.namaPemesan,
        request.body.jumlahTiket,
        request.body.noTelpon,
        request.body.email,
        request.body.idJadwal
      );
      return response.status(200).json(result);
    } else {
      return response.status(500).json("Stok Tidak Cukup");
    }
  } catch (error) {
    return response.status(500).json(error.code);
  }
});
