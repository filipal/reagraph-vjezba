import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import frontImg from '../assets/front.png'
import sideImg from '../assets/side.png'
import styles from './BodyPhotosCheck.module.scss'

export default function BodyPhotosCheck() {
  const navigate = useNavigate()

  return (
    <div className={styles.bodyPhotosCheckPage}>
      <Header
        variant="dark"
        title="Body Photos Check"
        onExit={() => navigate('/')}
      />

      <div className={styles.content}>
        <div className={styles.prompt}>Are you satisfied with your photos?</div>
        <div className={styles.photos}>
          <img src={frontImg} alt="Front" />
          <img src={sideImg} alt="Side" />
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.row1}>
          <button
            type="button"
            className={styles.smallWhiteButton}
            onClick={() => navigate('/body-scan?orientation=front')}
          >
            Retake Front
          </button>
          <button
            type="button"
            className={styles.smallWhiteButton}
            onClick={() => navigate('/body-scan?orientation=side')}
          >
            Retake Side
          </button>
        </div>
        <div className={styles.row2}>
          <button
            type="button"
            className={styles.largeWhiteButton}
            onClick={() => navigate('/body-scan')}
          >
            Retake Both Photos
          </button>
        </div>
        <div className={styles.row3}>
          <button
            type="button"
            className={styles.blackButton}
            onClick={() => navigate('/unreal-measurements')}
          >
            Generate Your Avatar
          </button>
        </div>
      </div>
    </div>
  )
}