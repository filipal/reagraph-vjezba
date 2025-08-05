import cn from 'classnames'
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
    <header className={cn(styles.appHeader)}>
      <button className={cn(styles.exitButton)} onClick={onExit} type="button">
        <img src={exitIcon} alt="Exit" />
      </button>
      <div className={cn(styles.headerTitle)}>{title}</div>
       <div className={cn(styles.rightBox)}>
        {rightContent}
        {onInfo && (
          <button className={cn(styles.infoButton)} onClick={onInfo} type="button">
            <img src={infoIcon} alt="Info" />
          </button>
        )}
      </div>
    </header>
  )
}