
import { useNavigate } from 'react-router-dom'
import BodyScanIllustration from '../assets/BodyScanIllustration.png'
import Header from '../components/Header'
import './BodyScanInfo.css'


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
    <div className="body-scan-info-page">
      {/* Header */}
      <Header title="Body Scanning Tips" onExit={() => navigate('/')} />

      <div className="body-scan-content">
        <div className="tips-list">
          {tips.map((tip, idx) => (
            <div className="tip-box" key={idx}>
              {tip}
            </div>
          ))}
        </div>
        <div className="scan-illustration">
          <img src={BodyScanIllustration} alt="Body Scan Illustration" />
        </div>
        <div className="quickmode-footer">
          <button className="button-back-bs" onClick={() => navigate('/avatar-info')}>Back</button>
          <button className="start-button-bs" onClick={() => navigate('/front-body-scan')}>Start Scanning</button>
        </div>
      </div>
    </div>
  )
}
