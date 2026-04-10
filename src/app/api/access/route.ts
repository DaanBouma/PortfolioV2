import { NextRequest, NextResponse } from 'next/server'
import {
  ACCESS_COOKIE_NAME,
  ACCESS_QUERY_PARAM,
  ACCESS_SECRET_ENV_NAME,
  ACCESS_SLUG_ENV_NAME,
  createAccessToken,
  hasValidAccessConfig,
} from '@/lib/access'

export async function GET(request: NextRequest) {
  const accessSlug = process.env[ACCESS_SLUG_ENV_NAME]
  const accessSecret = process.env[ACCESS_SECRET_ENV_NAME]
  const queryValue = request.nextUrl.searchParams.get(ACCESS_QUERY_PARAM)

  if (!accessSlug || !accessSecret || !hasValidAccessConfig(accessSlug, accessSecret) || queryValue !== accessSlug) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: createAccessToken(accessSlug, accessSecret),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })

  return response
}
