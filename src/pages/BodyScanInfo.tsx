
import { useNavigate } from 'react-router-dom'
import BodyScanIllustration from '../assets/BodyScanIllustration.svg'
import exitIcon from '../assets/exit.svg'
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
      <header className="header">
        <button className="icon-button" onClick={() => navigate('/')}> 
          <img src={exitIcon} alt="Exit" className="exit-icon" width={28} height={28} />
        </button>
        <h1 className="header-title">Body Scanning Tips</h1>
        <div className="header-spacer"></div>
      </header>

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
