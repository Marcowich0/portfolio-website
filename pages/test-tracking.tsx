// src/pages/test-tracking.tsx
import { useEffect } from 'react'

export default function TestTracking() {
  useEffect(() => {
    console.log('Page loaded - tracking should be triggered')
  }, [])

  return (
    <div className="p-4">
      <h1>Tracking Test Page</h1>
      <p>This page should trigger a tracking email.</p>
    </div>
  )
}