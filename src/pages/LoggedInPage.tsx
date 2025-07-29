import { useNavigate } from 'react-router-dom'
import exitIcon from '../assets/exit.svg'
import deleteIcon from '../assets/Delete Avatar.svg'
import './LoggedInPage.css'

interface Avatar {
  id: number
  name: string
  isSelected?: boolean
}

export default function LoggedInPage() {
  const navigate = useNavigate()

  const avatars: Avatar[] = [
    { id: 1, name: 'Avatar Name 1', isSelected: true },
    { id: 2, name: 'Avatar Name 2' },
    { id: 3, name: 'Avatar Name 3' },
  ]

  return (
    <div className="logged-in-page">
      <header className="header">
        <button className="back-button" onClick={() => navigate('/')}> 
          <img src={exitIcon} alt="Exit" className="exit-icon" width={20} height={20} />
        </button>
        <h1 className="title-logged">My Avatars</h1>
        <span className="count">{avatars.length}/5</span>
      </header>

      <ul className="avatar-list">
        {avatars.map((avatar) => (
          <li key={avatar.id} className="avatar-item">
            <div className={`avatar-name${avatar.isSelected ? ' selected' : ''}`}>{avatar.name}</div>
            <button className="icon-button" aria-label="remove avatar">
              <img src={deleteIcon} alt="Delete Avatar" width={14} height={14} />
            </button>
          </li>
        ))}
      </ul>
      <div className="footer">
        <button className="button-load" onClick={() => alert('Load Avatar')}>
          Load Avatar
        </button>
        <div className="footer-actions">
          <button className="button-back" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="button-create" onClick={() => alert('Create Avatar')}>
            Create New Avatar
          </button>
        </div>
      </div>
    </div>
  )
}