import express from "express";
import type { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { Jadwal, JadwalCatalog, JadwalEdit } from "../types/jadwal";

export const jadwalRouter = express.Router();
import * as jadwalService from "../controllers/jadwalController"
import { CustomRequest, authToken } from "../middlewares/auth";

jadwalRouter.get("/viewJadwal/:jadwalId", async (request: Request, response: Response) => {
    try {

        const { jadwalId } = request.params;
        const parsedJadwalId = parseInt(jadwalId, 10);

        let jadwal: JadwalEdit;
        jadwal = await jadwalService.getjadwalById(parsedJadwalId);
        
        if (!jadwal) {
            return response.status(404).json({ error: "Jadwal not found" });
        }

        return response.status(200).json(jadwal);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

jadwalRouter.get("/landingPage/event", async (request: Request, response: Response) => {
    try {
        let jadwal: Jadwal[];

        jadwal = await jadwalService.getjadwal();
        return response.status(200).json(jadwal);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});


jadwalRouter.get("/landingPage/catalog", async (request: Request, response: Response) => {
    try {
        let jadwal: JadwalCatalog[];

        jadwal = await jadwalService.getCatalog();
        return response.status(200).json(jadwal);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});


jadwalRouter.get("/listjadwal/:date", async (request: Request, response: Response) => {
    try {
        const { date } = request.params;
        console.log(date);
        const searchDate = new Date(`${date}T00:00:00.000Z`);

        searchDate.setHours(searchDate.getHours() - 7);

        
        let jadwal: Jadwal[];

        jadwal = await jadwalService.getListJadwal(searchDate);
        return response.status(200).json(jadwal);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

jadwalRouter.post("/addJadwal", authToken, [
    body("title").isString(),
    body("date").isString(),
    body("kapasitas").isNumeric(),
    body("hargaTiket").isNumeric(),
    body("planetariumId").isNumeric(),
    body("deskripsiJadwal").isString(),
    body("isKunjungan").isBoolean(),
    body("durasi").isNumeric(),
    body("imagePath").isString(),
    
], async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const { title, date, kapasitas, hargaTiket, planetariumId, deskripsiJadwal, isKunjungan, durasi, imagePath} = request.body;

        const jadwal = await jadwalService.addJadwal(title, date, kapasitas, hargaTiket, planetariumId, deskripsiJadwal, isKunjungan, durasi, imagePath);

        return response.status(201).json(jadwal);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

jadwalRouter.post("/editJadwal", authToken, [
    body("id").isNumeric(),
    body("title").isString(),
    body("date").isString(),
    body("kapasitas").isNumeric(),
    body("hargaTiket").isNumeric(),
    body("planetariumId").isNumeric(),
    body("deskripsiJadwal").isString(),
    body("isKunjungan").isBoolean(),
    body("durasi").isNumeric(),
    body("imagePath").isString(),

], async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const jadwalId = parseInt(request.params.id);
        const {id,  title, date, kapasitas, hargaTiket, planetariumId, deskripsiJadwal, isKunjungan, durasi, imagePath} = request.body;

        await jadwalService.editJadwal(id, title, date, kapasitas, hargaTiket, planetariumId, deskripsiJadwal, isKunjungan, durasi, imagePath);

        return response.status(200).json({ message: "Jadwal updated successfully" });
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

jadwalRouter.post("/deleteJadwal", authToken, [
    body("jadwalId").isNumeric(),
], async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        
        const {jadwalId} = request.body
        console.log(jadwalId)

        if (!request.header('IdPlanetarium')) {
            return response.status(403).json({ error: "Unauthorized" });
        }
        const idPlanetarium = parseInt(request.header('IdPlanetarium') as string);
        const jadwalPlanetarium = await jadwalService.getjadwalById(jadwalId);
        if (jadwalPlanetarium.planetariumId !== idPlanetarium) {
            return response.status(403).json({ error: "Unauthorized" });
        }

        await jadwalService.deleteJadwal(jadwalId);

        return response.status(200).json({ message: "Jadwal deleted successfully" });
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

// import axios from 'axios';
    // try {
    //     const response = await axios.post('http://localhost:9000/api/email/deleteJadwal', {
            // id : id,
    //     });
    //     console.log('jadwal delete successfully:', response.data);
    // } catch (error) {
    //     console.error('Error delete jadwal :', error);
    // }

