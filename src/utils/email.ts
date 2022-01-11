import nodemailer from 'nodemailer';

import { MailOptions } from '@src/types/index';
import { config } from '@src/config/config';

const { host, port, password, username } = config.mailTrap;

export const sendEmail = async (options: { email: string; subject: string; message: string }) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    auth: {
      user: username,
      pass: password,
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
