import exitIcon from '../../assets/exit.svg'
import infoIcon from '../../assets/InfoButton.svg'
import styles from './Header.module.scss'

export interface HeaderProps {
  title: string
  onExit: () => void
  onInfo?: () => void
  rightContent?: React.ReactNode
}

export default function Header({ title, onExit, onInfo, rightContent }: HeaderProps) {
  return (
    <header className={styles.appHeader}>
      <button className={styles.exitButton} onClick={onExit} type="button">
        <img src={exitIcon} alt="Exit" width={20} height={20} />
      </button>
      <h1 className={styles.headerTitle}>{title}</h1>
      {rightContent}
      {onInfo && (
        <button className={styles.infoButton} onClick={onInfo} type="button">
          <img src={infoIcon} alt="Info" width={20} height={20} />
        </button>
      )}
    </header>
  )
}