
import { useNavigate } from 'react-router-dom'
import BodyScanIllustration from '../assets/BodyScanIllustration.png'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './BodyScanInfo.module.scss'


export default function BodyScanInfo() {
  const navigate = useNavigate()
  const tips = [
    'Wear tight clothing to show body lines',
    'Stay in a well-lit room',
    'Turn on phone sound to hear the voice guide',
    'Place the phone upright at hip height, e.g. on a table against an object',
    'Step away from the phone within 2-3 metres',
  ]

  return (
    <div className={styles.bodyScanInfoPage}>
      {/* Header */}
      <Header title="Body Scanning Tips" onExit={() => navigate('/')} />

      <div className={styles.bodyScanContent}>
        <div className={styles.tipsList}>
          {tips.map((tip, idx) => (
            <div className={styles.tipBox} key={idx}>
              {tip}
            </div>
          ))}
        </div>
        <div className={styles.scanIllustration}>
          <img src={BodyScanIllustration} alt="Body Scan Illustration" />
        </div>
        <Footer>
          <div className={styles.footerActions}>
            <button className={styles.buttonBack} onClick={() => navigate('/avatar-info')}>Back</button>
            <button className={styles.buttonCreate} onClick={() => navigate('/front-body-scan')}>Start Scanning</button>
          </div>
        </Footer>
      </div>
    </div>
  )
}
