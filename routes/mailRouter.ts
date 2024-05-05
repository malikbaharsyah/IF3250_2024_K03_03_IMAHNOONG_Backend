import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const mailRouter = express.Router();
import * as mailService from "../controllers/mailController";

mailRouter.get("/sendMail/:emailReceiver", async (request: Request, response: Response) => {
    try {
        const { emailReceiver } = request.params;
        console.log(emailReceiver);
        const mail = await mailService.sendEmail(emailReceiver);
        return response.status(200).json(mail);
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

    