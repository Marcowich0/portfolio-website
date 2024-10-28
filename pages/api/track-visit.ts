import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function getLocationData(ip: string) {
  // Skip for localhost/invalid IPs
  if (ip === '0.0.0.0' || ip === '127.0.0.1' || ip.startsWith('192.168.')) {
    return null
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to get location data:', error)
    return null
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { ip, path, userAgent, referer, timestamp } = req.body

  try {
    // Get location data
    const locationData = await getLocationData(ip)
    
    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.NOTIFY_EMAIL,
      subject: `New Visit to ${path}`,
      html: `
        <h2>New Website Visit</h2>
        <p><strong>Time:</strong> ${timestamp}</p>
        <p><strong>Path:</strong> ${path}</p>
        <p><strong>IP Address:</strong> ${ip}</p>
        <p><strong>User Agent:</strong> ${userAgent || 'Not provided'}</p>
        <p><strong>Referrer:</strong> ${referer || 'Direct visit'}</p>
        ${locationData ? `
          <h3>Location Data:</h3>
          <p><strong>Country:</strong> ${locationData.country}</p>
          <p><strong>City:</strong> ${locationData.city}</p>
          <p><strong>Region:</strong> ${locationData.regionName}</p>
          <p><strong>ISP:</strong> ${locationData.isp}</p>
          <p><strong>Timezone:</strong> ${locationData.timezone}</p>
        ` : '<p>Location data not available</p>'}
      `,
    })

    res.status(200).json({ message: 'Visit tracked successfully' })
  } catch (error) {
    console.error('Error tracking visit:', error)
    res.status(500).json({ message: 'Failed to track visit' })
  }
}