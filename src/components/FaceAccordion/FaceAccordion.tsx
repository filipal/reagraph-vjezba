import faceIcon from '../../assets/face.png'
import styles from './FaceAccordion.module.scss'

export default function FaceAccordion() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p>
          To make your Avatar even more personalised, create a 3D model of your face in minutes
        </p>
      </div>
      <div className={styles.right}>
        <button type="button" className={styles.scanButton}>
          <img src={faceIcon} alt="" />
          Scan Your Face
        </button>
      </div>
    </div>
  )
}