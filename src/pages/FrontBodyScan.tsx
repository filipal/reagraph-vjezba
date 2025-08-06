import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import VoiceInfoOn from '../assets/VoiceInfoOn.svg'
import VoiceInfoOff from '../assets/VoiceInfoOff.svg'
import scanInstructions from '../assets/scan-instructions.mp3'
import FrontGuide from '../assets/FrontGuide.png'
import WomanFront from '../assets/WomanFront.png'
import styles from './FrontBodyScan.module.scss'

type ScanPhase = 'initial' | 'scanning' | 'countdown' | 'completed'

export default function FrontBodyScan({ onClose, onContinueToSideScan }: { onClose?: () => void, onContinueToSideScan?: () => void }) {
  const navigate = useNavigate()
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [scanPhase, setScanPhase] = useState<ScanPhase>('initial')
  const [countdown, setCountdown] = useState(5)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const initialSoundEnabled = useRef(soundEnabled)

  // Pokreni audio prilikom mounta komponente samo jednom. Ovaj efekt ne
  // ovisi o promjenama `soundEnabled`, nego koristi početnu vrijednost
  // spremljenu u referenci kako bi izbjegao zastarjele vrijednosti.
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = 0
      if (initialSoundEnabled.current) {
        audio.play()
      }
    }
    return () => audio?.pause()
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
    setCameraError(null)
    setScanPhase('scanning')
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const frontCamera = devices.find(
        d => d.kind === 'videoinput' && d.label.toLowerCase().includes('front')
      )

      const videoConstraints: MediaTrackConstraints = frontCamera
        ? { deviceId: { exact: frontCamera.deviceId } }
        : { facingMode: 'user' }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoConstraints,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play().catch(() => {})
      }
      setCountdown(5)
      setScanPhase('countdown')
    } catch (err) {
      console.error('Error starting video stream:', err)
      setCameraError('Unable to access camera. Please check permissions and try again.')
      setScanPhase('initial')
    }
  }

  useEffect(() => {
    return () => {
      const tracks = streamRef.current?.getTracks()
      tracks?.forEach(track => track.stop())
    }
  }, [])

  return (
    <div className={styles.frontBodyScanPage}>
      {scanPhase === 'initial' && (
        <img src={WomanFront} alt="Woman front" className={styles.womanFront} />
      )}
      <video ref={videoRef} className={styles.video} autoPlay playsInline />
      {scanPhase !== 'initial' && (
        <div className={styles.overlay}>
          <img src={FrontGuide} alt="Front guide" className={styles.frontGuide} />
        </div>
      )}
      <Header
        className={styles.scanHeader}
        variant="light"
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
        {cameraError && (
          <div className={styles.cameraError}>
            <p>{cameraError}</p>
            <button type="button" onClick={startScan}>Retry</button>
          </div>
        )}
      </div>

      {/* Voice instructions (audio only, neovisno o countdownu) */}
      <audio ref={audioRef} src={scanInstructions} />

      <Footer
        className={styles.scanFooter}
        actionText={
          scanPhase === 'initial'
            ? 'SCAN'
            : 'Continue to the Side Scan'
        }
        onAction={
          scanPhase === 'initial'
            ? startScan
            : onContinueToSideScan || (() => {})
        }
        actionDisabled={
          scanPhase === 'countdown' || scanPhase === 'scanning'
        }
      />
    </div>
  )
}