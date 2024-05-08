import express from 'express'
import payload from 'payload'
import path from 'path';
import nodemailer from 'nodemailer';

require('dotenv').config()
const app = express()
app.use('/assets', express.static(path.resolve(__dirname, './assets')));



// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {

  const nodemailer = require('nodemailer');
  const transport = await nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
      payload.sendEmail({
        to: 'gbv7une2bjqyk5uh@ethereal.email',
        subject: 'Hello',
        text: 'Initial Email',
      })
    },
    email: {
      fromName: 'Admin',
      fromAddress: 'admin@example.com',
      logMockCredentials: true, // Optional
      transport,
    },
  })

  // Add your own express routes here

  app.listen(3000, async () => {
    console.log(
      "Express is now listening for incoming connections on port 3000."
    )
  })
}

start()
