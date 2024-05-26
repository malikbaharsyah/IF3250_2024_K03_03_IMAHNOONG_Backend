import express from "express";
import type { Request, Response } from "express";
import { authToken, CustomRequest } from "../middlewares/auth";

export const notifRouter = express.Router();

const connections = new Map<string, Response[]>();

notifRouter.get('/', authToken, (req: Request, res: Response) => {
    try {
        const username = (req as CustomRequest).username;
        if(!username) return res.status(401).json("Unauthorized");

        // Set headers for SSE
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // Function to send a message
        const sendNotif = (data: string) => {
            res.write(`data: ${data}\n\n`);
        };

        // Send an event every second
        const intervalId = setInterval(() => {
            const message = `Message at ${new Date()}`;
            sendNotif(message);
        }, 1000);

        // Clear interval on client disconnect
        req.on('close', () => {
            clearInterval(intervalId);
            res.end();
        });
    } catch (error: any) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).json(error.message);
        }
    }
    
});