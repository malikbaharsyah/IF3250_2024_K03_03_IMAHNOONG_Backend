import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const mailRouter = express.Router();
import * as mailService from "../controllers/mailController";

mailRouter.post("/sendMail", [
    body("isTerima").isBoolean(),
    body("email").isString(),
    body("idTiket"),
], async (request: Request, response: Response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        const { isTerima, email, idTiket} = request.body;
        // console.log(email);
        // if (terima){
        //     try {
        //         await mailService.confirmRequest(id);
        //         // return response.status(200 ).json({ message: "Request confirmated" });
        //     }
        //     catch (error: any) {
        //         return response.status(500).json({ error: error.message });
        //     }
        // }
        const mail = await mailService.sendEmail(email, isTerima, idTiket);
        return response.status(200).json(mail);
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

mailRouter.post("/terima", [
    body("id").isNumeric(),
], async (request: Request, response: Response) => {
    const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
    try {
        const {id} = request.body;
        // console.log("masuk terima");

        // const mail = await mailService.sendEmail(emailReceiver);
        await mailService.confirmRequest(id);
        return response.status(200 ).json({ message: "Request confirmated" });
    }
    catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

// import axios from 'axios';
    // try {
    //     const response = await axios.get('http://localhost:9000/api/email/sendMail/' + email, {
    //     });
    //     console.log('Email sent successfully:', response.data);
    // } catch (error) {
    //     console.error('Error sent email :', error);
    // }

    