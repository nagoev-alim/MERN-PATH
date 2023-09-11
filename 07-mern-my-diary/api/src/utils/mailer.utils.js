// 🔳 Imports packages
import nodemailer from 'nodemailer';
// 🔳 Custom import
import { configuration } from '../config/index.js';

/**
 * @description Send email
 * @param email
 * @param subject
 * @param text
 * @returns {Promise<*>}
 */
export default async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: configuration.email.service,
      auth: {
        user: configuration.email.user,
        pass: configuration.email.pass,
      },
    });

    await transporter.sendMail({
      from: configuration.email.user,
      to: email,
      subject: subject,
      html: `<b>Hey there! </b><br> Please click on the <a href='${text}' target='_blank'>link</a> to activate your account`,
    });
    console.log('🟩 Email sent successfully');
  } catch (error) {
    console.log('❌ Email not sent!');
    console.log(error);
    return error;
  }
};
