// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip tracking for assets, api routes, and files
  if (
    request.nextUrl.pathname.startsWith('/_next') || 
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Get IP address, accounting for proxies and Cloudflare
  const ip = request.headers.get('cf-connecting-ip') || // Cloudflare
           request.headers.get('x-forwarded-for') || 
           request.headers.get('x-real-ip') ||
           request.ip ||
           '0.0.0.0'

  // Track the visit
  try {
    await fetch(`${request.nextUrl.origin}/api/track-visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ip,
        path: request.nextUrl.pathname,
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
        timestamp: new Date().toISOString()
      }),
    })
  } catch (error) {
    console.error('Failed to track visit:', error)
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /robots.txt, etc.
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}