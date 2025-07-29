import './Footer.css'
import type { ReactNode } from 'react'

export interface FooterProps {
  children: ReactNode
}

export default function Footer({ children }: FooterProps) {
  return <div className="footer">{children}</div>
}