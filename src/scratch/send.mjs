import nodemailer from 'nodemailer';

// 1. make a throwaway Ethereal account
const account = await nodemailer.createTestAccount();

// 2. connect to Ethereal's SMTP server with it
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: { user: account.user, pass: account.pass },
});

// 3. send one email, the Ethereal server will catch whichever email is sent to it
const info = await transporter.sendMail({
  from: '"Mail API" <no-reply@mail-api.test>',
  to: 'alex@example.com',
  subject: 'Welcome, Alex!',
  text: 'Hi Alex, thanks for joining!',
});

// 4. the link to view it in the browser
console.log(nodemailer.getTestMessageUrl(info));
