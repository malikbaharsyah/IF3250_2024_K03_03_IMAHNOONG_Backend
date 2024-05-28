import express from "express";
import type { Request, Response } from "express";
import { requestTiket } from "../controllers/pesanTiket";

export const requestRouter = express.Router();

requestRouter.post("/", async (request: Request, response: Response) => {
    try {
        const result: Promise<number> = requestTiket(
            request.body.planetariumId,
            request.body.namaPemesan,
            request.body.jumlahTiket,
            request.body.email,
            request.body.note,
            request.body.konfirmasi,
            request.body.noTelepon,
            request.body.waktuKunjungan,
            request.body.durasi
        );
        return response.status(321).json(result);
    } catch (error){
        return response.status(500).json(error.code);
    }
});