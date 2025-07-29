import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import deleteIcon from '../assets/Delete Avatar.svg'
import './LoggedInPage.css'

interface Avatar {
  id: number
  name: string
  isSelected?: boolean
}

export default function LoggedInPage() {
  const navigate = useNavigate()

  const [avatars, setAvatars] = useState<Avatar[]>([
    { id: 1, name: 'Avatar Name 1' },
    { id: 2, name: 'Avatar Name 2' },
    { id: 3, name: 'Avatar Name 3' },
  ])
  const [selectedAvatarId, setSelectedAvatarId] = useState<number>(1)
  const [loadedAvatarId, setLoadedAvatarId] = useState<number>(1)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<null | number>(null)

  const handleSelect = (id: number) => setSelectedAvatarId(id)
  const handleLoad = () => setLoadedAvatarId(selectedAvatarId)
  const handleDelete = (id: number) => setShowDeleteConfirm(id)
  const confirmDelete = () => {
    setAvatars(avatars.filter(a => a.id !== showDeleteConfirm))
    if (selectedAvatarId === showDeleteConfirm) setSelectedAvatarId(avatars[0]?.id || 0)
    if (loadedAvatarId === showDeleteConfirm) setLoadedAvatarId(avatars[0]?.id || 0)
    setShowDeleteConfirm(null)
  }

  return (
    <div className="logged-in-page">
      <Header
        title="My Avatars"
        onExit={() => navigate('/')}
        rightContent={<span className="count">{avatars.length}/5</span>}
      />

      <ul className="avatar-list">
        {avatars.map((avatar) => (
          <li key={avatar.id} className="avatar-item">
            <button
              className={`avatar-name${selectedAvatarId === avatar.id ? ' selected' : ''}`}
              onClick={() => handleSelect(avatar.id)}
              type="button"
            >
              {avatar.name}
            </button>
            <button className="icon-button" aria-label="remove avatar" onClick={() => handleDelete(avatar.id)}>
              <img src={deleteIcon} alt="Delete Avatar" width={14} height={14} />
            </button>
          </li>
        ))}
      </ul>
      <Footer>
        {showDeleteConfirm ? (
          <div className="delete-confirm">Are you sure?</div>
        ) : (
          <button
            className={`button-load${selectedAvatarId === loadedAvatarId ? ' disabled' : ''}`}
            onClick={handleLoad}
            disabled={selectedAvatarId === loadedAvatarId}
          >
            Load Avatar
          </button>
        )}
        <div className="footer-actions">
          {showDeleteConfirm ? (
            <>
              <button className="button-back" onClick={() => setShowDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="button-create" onClick={confirmDelete}>
                Delete Avatar
              </button>
            </>
          ) : (
            <>
              <button className="button-back" onClick={() => navigate('/login')}>
                Back
              </button>
              <button className="button-create" onClick={() => navigate('/avatar-info')}>
                Create New Avatar
              </button>
            </>
          )}
        </div>
      </Footer>
    </div>
  )
}