import { type ReactNode } from 'react'
import styles from './DataPanel.module.scss'

interface DataPanelProps {
  title: string
  children: ReactNode
}

export default function DataPanel({ title, children }: DataPanelProps) {
  return (
    <div className={styles.dataPanel}>
      <div className={styles.dataPanelHeader}>
        <p>{title}</p>
      </div>
      <div className={styles.dataPanelContent}>
        {children}
      </div>
    </div>
  )
}