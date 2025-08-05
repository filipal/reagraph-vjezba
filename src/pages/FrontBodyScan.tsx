import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import VoiceInfoOn from '../assets/VoiceInfoOn.svg'
import VoiceInfoOff from '../assets/VoiceInfoOff.svg'
import scanInstructions from '../assets/scan-instructions.mp3'
import FrontGuide from '../assets/FrontGuide.png'
import styles from './FrontBodyScan.module.scss'

type ScanPhase = 'initial' | 'countdown' | 'completed'

export default function FrontBodyScan({ onClose, onContinueToSideScan }: { onClose?: () => void, onContinueToSideScan?: () => void }) {
  const navigate = useNavigate()
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [scanPhase, setScanPhase] = useState<ScanPhase>('initial')
  const [countdown, setCountdown] = useState(5)
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const initialSoundEnabled = useRef(soundEnabled)

  // Pokreni audio prilikom mounta komponente samo jednom. Ovaj efekt ne
  // ovisi o promjenama `soundEnabled`, nego koristi početnu vrijednost
  // spremljenu u referenci kako bi izbjegao zastarjele vrijednosti.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      if (initialSoundEnabled.current) {
        audioRef.current.play()
      }
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

  const startScan = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play().catch(() => {})
      }
      setScanPhase('countdown')
      setCountdown(5)
    } catch (err) {
      console.error('Error starting video stream:', err)
    }
  }

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop())
    }
  }, [])

  return (
    <div className={styles.frontBodyScanPage}>
      <video ref={videoRef} className={styles.video} autoPlay playsInline />
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
        {scanPhase !== 'initial' && (
          <div className={styles.overlay}>
            <img src={FrontGuide} alt="Front guide" className={styles.frontGuide} />
          </div>
        )}
        {scanPhase === 'countdown' && countdown > 0 && (
          <div className={styles.countdownNumber}>{countdown}</div>
        )}
        {scanPhase === 'completed' && (
          <div className={styles.scanDoneMsg}><span>Front Scan Done!</span></div>
        )}
      </div>

      {/* Voice instructions (audio only, neovisno o countdownu) */}
      <audio ref={audioRef} src={scanInstructions} />

      <Footer
        backText="Back"
        actionText={scanPhase === 'initial' ? 'SCAN' : 'Continue to the Side Scan'}
        onBack={onClose || (() => navigate(-1))}
        onAction={scanPhase === 'initial' ? startScan : onContinueToSideScan || (() => {})}
        actionDisabled={scanPhase === 'countdown'}
        actionType="primary"
      />
    </div>
  )
}