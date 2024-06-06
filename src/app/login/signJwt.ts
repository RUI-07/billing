import {SignJWT} from 'jose'

const ISSUER = process.env.APP_NAME!
const AUDIENCE = `${process.env.APP_NAME}-api`

const EXPIRE = '1day'

export const signJwt = async (payload: Record<string, any>) => {
  const secret = new TextEncoder().encode(process.env.SECRET)
  const alg = 'HS256'

  return new SignJWT(payload)
    .setProtectedHeader({alg})
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(EXPIRE)
    .sign(secret)
}
