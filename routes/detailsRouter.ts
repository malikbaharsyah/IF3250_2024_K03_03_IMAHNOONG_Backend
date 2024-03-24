import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Planetarium } from "../types/planetarium";
import * as catalogService from "../controllers/catalog";

export const detailsRouter = express.Router();

detailsRouter.get("/:id", async (request: Request, response: Response) => {
    try {
        let details: Planetarium;
        details = await catalogService.getPlanetariumById(parseInt(request.params.id));
        return response.status(200).json(details);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
}) 