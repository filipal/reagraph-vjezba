import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import VoiceInfoOn from '../assets/VoiceInfoOn.svg'
import VoiceInfoOff from '../assets/VoiceInfoOff.svg'
import scanInstructions from '../assets/scan-instructions.mp3'
import './FrontBodyScan.css'

type ScanPhase = 'initial' | 'countdown' | 'completed'

export default function FrontBodyScan({ onClose, onContinueToSideScan }: { onClose?: () => void, onContinueToSideScan?: () => void }) {
  const navigate = useNavigate()
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [scanPhase, setScanPhase] = useState<ScanPhase>('initial')
  const [countdown, setCountdown] = useState(5)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Pokreni audio na mount
  useEffect(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }, [])

  // Pauziraj/pokreni audio kad se promijeni soundEnabled
  useEffect(() => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [soundEnabled])

  // Countdown logika (neovisna o zvuku)
  useEffect(() => {
    let timer: number
    if (scanPhase === 'countdown' && countdown > 0) {
      timer = window.setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (scanPhase === 'countdown' && countdown === 0) {
      timer = window.setTimeout(() => setScanPhase('completed'), 1000)
    }
    return () => clearTimeout(timer)
  }, [scanPhase, countdown])

  const startScan = () => {
    setScanPhase('countdown')
    setCountdown(5)
  }

  return (
    <div className="front-body-scan-page">
      <Header
        title="Front Body Scan"
        onExit={onClose || (() => navigate(-1))}
        rightContent={
          <button className="voice-button" onClick={() => setSoundEnabled(v => !v)} type="button">
            <img src={soundEnabled ? VoiceInfoOn : VoiceInfoOff} alt="Voice Info" />
          </button>
        }
      />

      {/* Main scan area */}
      <div className="scan-area">
        {scanPhase === 'countdown' && countdown > 0 && (
          <div className="countdown-number">{countdown}</div>
        )}
        {scanPhase === 'completed' && (
          <div className="scan-done-msg"><span>Front Scan Done!</span></div>
        )}
      </div>

      {/* Voice instructions (audio only, neovisno o countdownu) */}
      <audio ref={audioRef} src={scanInstructions} />

      <Footer>
        <div className="footer-actions">
          {scanPhase === 'initial' && (
            <button className="scan-button" onClick={startScan}>SCAN</button>
          )}
          {scanPhase === 'completed' && (
            <button className="continue-button" onClick={onContinueToSideScan}>
              Continue to the Side Scan
            </button>
          )}
        </div>
      </Footer>
    </div>
  )
}