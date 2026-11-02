import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendMail = async (email, subject, body, html) => {
    try {
        const user = process.env.EMAIL_USER || "agrotradehelp@gmail.com";
        const pass = process.env.EMAIL_PASS || "cldf skjh qtnq keyw";

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: user,
                pass: pass,
            },
        });

        const mailOptions = {
            from: `"AgroTrade" <${user}>`,
            to: email,
            subject: subject,
            text: body,
            ...(html ? { html: html } : {})
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Mail Sent Successfully. MessageId:', info.messageId);
        return { success: true, info };
    } catch (error) {
        console.error('Nodemailer Error:', error.message);
        return { success: false, error };
    }
};
