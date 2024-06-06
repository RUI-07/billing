import {jwtVerify} from 'jose'
import {cookies} from 'next/headers'

export const cookieJwtCheck = async () => {
  const cookieStore = cookies()
  const jwt = cookieStore.get('jwt')
  if (!jwt) return false
  const secret = new TextEncoder().encode(process.env.SECRET)
  try {
    await jwtVerify(jwt.value, secret)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
