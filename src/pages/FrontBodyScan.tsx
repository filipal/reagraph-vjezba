import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import VoiceInfoOn from '../assets/VoiceInfoOn.svg'
import VoiceInfoOff from '../assets/VoiceInfoOff.svg'
import scanInstructions from '../assets/scan-instructions.mp3'
import styles from './FrontBodyScan.module.scss'

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
  }, [soundEnabled])

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
    <div className={styles.frontBodyScanPage}>
      <Header
        title="Front Body Scan"
        onExit={onClose || (() => navigate(-1))}
        rightContent={
          <button className={styles.voiceButton} onClick={() => setSoundEnabled(v => !v)} type="button">
            <img src={soundEnabled ? VoiceInfoOn : VoiceInfoOff} alt="Voice Info" />
          </button>
        }
      />

      {/* Main scan area */}
      <div className={styles.scanArea}>
        {scanPhase === 'countdown' && countdown > 0 && (
          <div className={styles.countdownNumber}>{countdown}</div>
        )}
        {scanPhase === 'completed' && (
          <div className={styles.scanDoneMsg}><span>Front Scan Done!</span></div>
        )}
      </div>

      {/* Voice instructions (audio only, neovisno o countdownu) */}
      <audio ref={audioRef} src={scanInstructions} />

      <Footer>
        <div className={styles.footerActions}>
          {scanPhase === 'initial' && (
            <button className={styles.scanButton} onClick={startScan}>SCAN</button>
          )}
          {scanPhase === 'completed' && (
            <button className={styles.continueButton} onClick={onContinueToSideScan}>
              Continue to the Side Scan
            </button>
          )}
        </div>
      </Footer>
    </div>
  )
}