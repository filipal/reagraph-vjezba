import { AuthProvider, useAuth } from "react-oidc-context";
import logo from '../assets/fitspace-logo-gradient-nobkg.svg';
import exitIcon from '../assets/exit.svg';
import googleLogo from '../assets/google-logo.svg';
import appleLogo from '../assets/apple-logo.svg';
import facebookLogo from '../assets/facebook-logo.svg';
import styles from './LoginPage.module.scss';

// OIDC konfiguracija
const oidcConfig = {
  authority: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_0cK7yNVJr",
  client_id: "35gs2safccnf49vo9d7ubqv65o",
  redirect_uri: window.location.origin, // automatski radi lokalno i na produkciji
  response_type: "code",
  scope: "openid email phone",
};

function LoginContent() {
  const auth = useAuth();
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
            <button type="button" className={styles.socialButton} onClick={() => auth.signinRedirect()}>
              <img src={googleLogo} alt="Google" className={styles.socialIcon} />
              <span className={styles.socialLabel}>Log in with Google</span>
            </button>
            <button type="button" className={styles.socialButton} onClick={() => auth.signinRedirect()}>
              <img src={appleLogo} alt="Apple" className={styles.socialIconApple} />
              <span className={styles.socialLabel}>Log in with Apple</span>
            </button>
            <button
              type="button"
              className={`${styles.socialButton} ${styles.socialButtonLast}`}
              onClick={() => auth.signinRedirect()}
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
  );
}

const LoginPage = () => (
  <AuthProvider {...oidcConfig}>
    <LoginContent />
  </AuthProvider>
);

export default LoginPage;