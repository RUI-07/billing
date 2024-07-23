import {LoginForm} from '@/components/login/LoginForm'
import {HOME_PAGE} from '@/constant'
import {cookieJwtCheck} from '@/util/cookieJwtCheck'
import {redirect} from 'next/navigation'

const Login = async () => {
  if (await cookieJwtCheck()) {
    redirect(HOME_PAGE)
  } else {
    return <LoginForm />
  }
}

export default Login
