/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Review } from "../types/review";

import * as reviewService from "../controllers/review";

export const reviewRouter = express.Router();

reviewRouter.get("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    let reviews: Review[];
    reviews = await reviewService.getReviewsByPlanetariumId(parseInt(id));
    return response.status(200).json(reviews);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
