import express from "express";
import type { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { EditPlanetarium } from "../types/planetarium";
import * as catalogService from "../controllers/catalog";

export const detailsRouter = express.Router();

detailsRouter.get("/:id", async (request: Request, response: Response) => {
    try {
        let details: EditPlanetarium;
        details = await catalogService.getPlanetariumById(parseInt(request.params.id));
        return response.status(200).json(details);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
}) 

detailsRouter.post("/editPlanetarium", [
    body("id").isNumeric(),
    body("namaPlanetarium").isString(),
    body("deskripsi").isString(),
    body("prosedurPendaftaran").isString(),
    body("tataTertib").isString(),
    body("noTelepon").isString(),
    body("imagePath").isArray(),
    body("lokasi").isString(),
], async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // const planetariumId = parseInt(request.params.id);
        const { id, namaPlanetarium, deskripsi, prosedurPendaftaran, tataTertib, noTelepon, imagePath, lokasi  } = request.body;

        await catalogService.editPlanetarium(id, namaPlanetarium, deskripsi, prosedurPendaftaran, tataTertib, noTelepon, imagePath, lokasi);

        return response.status(200).json({ message: "Planetarium updated successfully" });
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});