import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import deleteIcon from '../assets/Delete Avatar.svg'
import styles from './LoggedInPage.module.scss'

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
    <div className={styles.loggedInPage}>
      <Header
        title="My Avatars"
        onExit={() => navigate('/')}
        rightContent={<span className={styles.count}>{avatars.length}/5</span>}
      />

      <ul className={styles.avatarList}>
        {avatars.map((avatar) => (
          <li key={avatar.id} className={styles.avatarItem}>
            <button
              className={`${styles.avatarName}${selectedAvatarId === avatar.id ? ' ' + styles.selected : ''}`}
              onClick={() => handleSelect(avatar.id)}
              type="button"
            >
              {avatar.name}
            </button>
            <button className={styles.iconButton} aria-label="remove avatar" onClick={() => handleDelete(avatar.id)}>
              <img src={deleteIcon} alt="Delete Avatar" width={14} height={14} />
            </button>
          </li>
        ))}
      </ul>

      <Footer
        topButtonText="Load Avatar"
        onTopButton={handleLoad}
        topButtonDisabled={selectedAvatarId === loadedAvatarId}
        topButtonType="primary"
        backText={showDeleteConfirm ? "Cancel" : "Back"}
        actionText={showDeleteConfirm ? "Delete Avatar" : "Create New Avatar"}
        onBack={() => showDeleteConfirm ? setShowDeleteConfirm(null) : navigate('/login')}
        onAction={() => showDeleteConfirm ? confirmDelete() : navigate('/avatar-info')}
        actionDisabled={false}
        actionType="black"
      />
      {showDeleteConfirm && (
        <div className={styles.deleteConfirmRow}>Are you sure?</div>
      )}
    </div>
  )
}