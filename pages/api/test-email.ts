// src/pages/api/test-email.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Create transporter with current configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send test email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.NOTIFY_EMAIL,
      subject: 'Test Email - Tracking System',
      html: `
        <h2>Test Email</h2>
        <p>If you're receiving this email, your email configuration is working correctly.</p>
        <h3>Current Configuration:</h3>
        <ul>
          <li>SMTP Host: ${process.env.SMTP_HOST}</li>
          <li>SMTP Port: ${process.env.SMTP_PORT}</li>
          <li>From Email: ${process.env.SMTP_FROM}</li>
          <li>To Email: ${process.env.NOTIFY_EMAIL}</li>
        </ul>
      `,
    })

    res.status(200).json({ message: 'Test email sent successfully' })
  } catch (error: any) {
    console.error('Error sending test email:', error)
    res.status(500).json({ 
      message: 'Failed to send test email', 
      error: error.message 
    })
  }
}