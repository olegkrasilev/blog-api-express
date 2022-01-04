import nodemailer from 'nodemailer';
import { MailOptions } from '../types/index';

export const sendEmail = async (options: { email: string; subject: string; message: string }) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MT_HOST,
    port: Number(process.env.MT_PORT),
    auth: {
      user: process.env.MT_USERNAME,
      pass: process.env.MT_PASSWORD,
    },
  });

  // 2) Define the email options

  const mailOptions: MailOptions = {
    from: 'Oleg Krasilev <hello@oleg@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Send the email

  await transporter.sendMail(mailOptions);
};
