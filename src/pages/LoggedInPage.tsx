import { useNavigate } from 'react-router-dom'
import './LoggedInPage.css'

interface Avatar {
  id: number
  name: string
}

export default function LoggedInPage() {
  const navigate = useNavigate()

  const avatars: Avatar[] = [
    { id: 1, name: 'Avatar Name 1' },
    { id: 2, name: 'Avatar Name 2' },
    { id: 3, name: 'Avatar Name 3' },
  ]

  return (
    <div className="logged-in-page">
      <header className="page-header">
        <button onClick={() => navigate(-1)}>Back</button>
        <h1>My Avatars</h1>
        <button onClick={() => navigate('/')}>Exit</button>
      </header>
      <ul className="avatar-list">
        {avatars.map((a) => (
          <li key={a.id}>{a.name}</li>
        ))}
      </ul>
      <div className="actions">
        <button onClick={() => alert('Load Avatar')}>Load Avatar</button>
        <button onClick={() => alert('Create Avatar')}>Create New Avatar</button>
      </div>
    </div>
  )
}