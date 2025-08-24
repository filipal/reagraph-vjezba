import { useEffect } from "react"
import { useAuth } from "react-oidc-context"
import logo from '../assets/Fitspace-logo-gradient-nobkg.svg'
import exitIcon from '../assets/exit.svg'
import googleLogo from '../assets/google-logo.svg'
import appleLogo from '../assets/apple-logo.svg'
import facebookLogo from '../assets/facebook-logo.svg'
import styles from './LoginPage.module.scss'

export default function LoginPage() {
  const auth = useAuth()
  const params = new URLSearchParams(window.location.search)
  const isCallback = params.has('code') || params.has('error')

  useEffect(() => {
    if (isCallback) {
      const runCallback = async () => {
        try {
          // guard in case typings differ from runtime
          const cb = (auth as any)?.signinRedirectCallback
          if (typeof cb === 'function') {
            await cb()
          } else {
            console.warn('signinRedirectCallback is not available on auth object', auth)
          }
        } catch (err) {
          console.error('Error while processing signin redirect callback', err)
        }
      }

      void runCallback()
    }
  }, [auth, isCallback])

  if (isCallback) {
    return <p>Processing login...</p>
  }

  return (
    <div className={styles.loginPage}>
      <button className={styles.backButton} onClick={() => window.location.href = '/'}>
        <img src={exitIcon} alt="Exit" className={styles.exitIcon} />
      </button>

      <img src={logo} alt="Fitspace" className={styles.logo} />

      <div className={styles.webPanel}>
        <div className={styles.loginBg} />

        <button
          type="button"
          className={styles.createButton}
          onClick={() => window.location.href = '/avatar-info'}
        >
          Create Your Digital Twin
        </button>

        <div className={styles.loginFormSection}>
          <span className={styles.introText}>
            If you already have a Fitspace avatar, log in to load it:
          </span>

          <div className={styles.loginForm}>
            <button type="button" className={styles.socialButton} onClick={() =>
              (auth.signinRedirect ? auth.signinRedirect().catch((e: any) => console.error('signinRedirect failed', e)) : console.warn('signinRedirect not available', auth))
            }>
              <img src={googleLogo} alt="Google" className={styles.socialIcon} />
              <span className={styles.socialLabel}>Log in with Google</span>
            </button>
            <button type="button" className={styles.socialButton} onClick={() =>
              (auth.signinRedirect ? auth.signinRedirect().catch((e: any) => console.error('signinRedirect failed', e)) : console.warn('signinRedirect not available', auth))
            }>
              <img src={appleLogo} alt="Apple" className={styles.socialIconApple} />
              <span className={styles.socialLabel}>Log in with Apple</span>
            </button>
            <button
              type="button"
              className={`${styles.socialButton} ${styles.socialButtonLast}`}
              onClick={() =>
                (auth.signinRedirect ? auth.signinRedirect().catch((e: any) => console.error('signinRedirect failed', e)) : console.warn('signinRedirect not available', auth))
              }
            >
              <img src={facebookLogo} alt="Facebook" className={styles.socialIcon} />
              <span className={styles.socialLabel}>Log in with Facebook</span>
            </button>
          </div>
          {auth.isLoading && <p>Učitavanje...</p>}
          {auth.error && <p style={{ color: "red" }}>Greška: {auth.error.message}</p>}
        </div>
      </div>
    </div>
  )
}