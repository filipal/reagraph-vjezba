import exitIcon from '../assets/exit.svg'
import infoIcon from '../assets/InfoButton.svg'
import './Header.css'

export interface HeaderProps {
  title: string
  onExit: () => void
  onInfo?: () => void
  rightContent?: React.ReactNode
}

export default function Header({ title, onExit, onInfo, rightContent }: HeaderProps) {
  return (
    <header className="app-header">
      <button className="exit-button" onClick={onExit} type="button">
        <img src={exitIcon} alt="Exit" width={20} height={20} />
      </button>
      <h1 className="header-title">{title}</h1>
      {rightContent}
      {onInfo && (
        <button className="info-button" onClick={onInfo} type="button">
          <img src={infoIcon} alt="Info" width={20} height={20} />
        </button>
      )}
    </header>
  )
}