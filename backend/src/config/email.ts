import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@otasukeai.com';
export const EMAIL_NOTIFICATION_TO = process.env.EMAIL_NOTIFICATION_TO || 'info@otasukeai.com';

export default transporter;
