import styles from './Footer.module.scss'
import type { ReactNode } from 'react'

export interface FooterProps {
  children: ReactNode
}

export default function Footer({ children }: FooterProps) {
  return <div className={styles.footer}>{children}</div>
}