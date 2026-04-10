import { createHmac, timingSafeEqual } from 'crypto'

export const ACCESS_COOKIE_NAME = 'site_access_session'
export const ACCESS_QUERY_PARAM = 'h'
export const ACCESS_SLUG_ENV_NAME = 'SITE_ACCESS_SLUG'
export const ACCESS_SECRET_ENV_NAME = 'SITE_ACCESS_SECRET'

function createAccessSignature(slug: string, secret: string) {
  return createHmac('sha256', secret).update(`site-access:${slug}`).digest('hex')
}

export function createAccessToken(slug: string, secret: string) {
  return `v1.${createAccessSignature(slug, secret)}`
}

export function hasValidAccessConfig(slug?: string, secret?: string) {
  return Boolean(slug && secret)
}

export function verifyAccessToken(token: string | undefined, slug?: string, secret?: string) {
  if (!token || !slug || !secret) {
    return false
  }

  const expectedToken = createAccessToken(slug, secret)
  const receivedBuffer = Buffer.from(token)
  const expectedBuffer = Buffer.from(expectedToken)

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false
  }

  return timingSafeEqual(receivedBuffer, expectedBuffer)
}
