import styles from './HairAccordion.module.scss'

export default function HairAccordion() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>{/* Left content */}</div>
      <div className={styles.right}>{/* Right content */}</div>
    </div>
  )
}