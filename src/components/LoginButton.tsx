import { Button } from '@material-ui/core'
import { signInWithPopup } from '../service/firebase'
import { useAuth } from '../hooks/useAuth'

function LoginButton() {
  const { login, signout } = useAuth()

  if (login.status === 'none') {
    return (
      <div>
        {/* <Button color="inherit" onClick={() => signin('google')}>
          Google
        </Button> */}
        <Button color="inherit" onClick={() => signInWithPopup('twitter')}>
          Twitterログイン
        </Button>
      </div>
    )
  }
  return (
    <Button color="inherit" onClick={() => signout()}>
      ログアウト
    </Button>
  )
}

export default LoginButton
