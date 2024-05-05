import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (emailReceiver): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });


    const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.EMAIL,
        to: emailReceiver,
        subject: 'Pesanan anda diterima!',
        text: 'Tiket Planetarium anda sudah berhasil dipesan!', 
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Template</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }

                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }

                    h1 {
                        color: #333333;
                    }

                    p {
                        color: #666666;
                        line-height: 1.6;
                    }

                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #800080;
                        color: #000000;
                        text-decoration: none;
                        border-radius: 5px;
                    }

                    .button:hover {
                        background-color: #400040;
                        color: #000000;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Pesanan yang anda buat telah dikonfirmasi</h1>
                </div>
            </body>
            </html>
        ` 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};