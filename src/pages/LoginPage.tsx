import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/Fitspace-logo-gradient-nobkg.svg'
import exitIcon from '../assets/exit.svg'
import styles from './LoginPage.module.scss'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    navigate('/logged-in')
  }

  return (
    <div className={styles.loginPage}>
      <button className={styles.backButton} onClick={() => navigate('/')}>
        <img src={exitIcon} alt="Exit" className={styles.exitIcon} />
      </button>
      <img src={logo} alt="Fitspace" className={styles.logo} />
      <div className={styles.webPanel}>
        <div className={styles.loginBg} />
        <button
          type="button"
          className={styles.createButton}
          onClick={() => navigate('/avatar-info')}
        >
          Create Your Digital Twin
        </button>
        <div className={styles.loginFormSection}>
          <span className={styles.introText}>
            If you already have a Fitspace avatar, log in to load it:
          </span>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <label className={styles.inputGroup} htmlFor="email">
              <input id="email" type="email" className={styles.textInput} required autoComplete="email" />
            </label>

            <label className={styles.inputGroup} htmlFor="password">
              <input id="password" type="password" className={styles.textInput} required autoComplete="current-password" />
            </label>

            <button type="submit" className={styles.loginButton}>Log In</button>
          </form>
        </div>
      </div>
    </div>
  )
}