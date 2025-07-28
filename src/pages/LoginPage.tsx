import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/Fitspace-logo-gradient-nobkg.png'
import './LoginPage.css'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    navigate('/logged-in')
  }

  return (
    <div className="login-page">
      <button className="back-button" onClick={() => navigate('/')}>×</button>
      <img src={logo} alt="Fitspace" className="logo" />
      <div className="login-bg" />
      <button
        type="button"
        className="create-button"
        onClick={() => navigate('/logged-in')}
      >
        Create Your Digital Twin
      </button>
      <div className="login-form-section">
        <span className="intro-text">
          If you already have a Fitspace avatar, log in to load it:
        </span>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="input-group">
            <span className="input-label">E-mail Address</span>
            <input type="email" required />
          </label>
          <label className="input-group">
            <span className="input-label">Password</span>
            <input type="password" required />
          </label>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}