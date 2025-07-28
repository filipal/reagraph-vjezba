import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    navigate('/logged-in')
  }

  return (
    <div className="login-page">
      <header className="page-header">
        <h1>My Avatars</h1>
        <div className="header-actions">
          <button onClick={() => navigate(-1)}>Back</button>
          <button onClick={() => navigate('/')}>Exit</button>
        </div>
      </header>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          <span>E-mail Address</span>
          <input type="email" required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" required />
        </label>
        <div className="actions">
          <button type="submit">Log In</button>
          <button type="button" onClick={() => navigate('/logged-in')}>Create Your Digital Twin</button>
        </div>
      </form>
    </div>
  )
}