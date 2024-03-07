/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Planetarium } from "../types/planetarium";

import * as catalogService from "../controllers/catalog";

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
