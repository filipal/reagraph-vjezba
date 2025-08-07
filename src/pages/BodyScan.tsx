import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import VoiceInfoOn from '../assets/VoiceInfoOn.svg'
import VoiceInfoOff from '../assets/VoiceInfoOff.svg'
import scanInstructions from '../assets/scan-instructions.mp3'
import FrontGuide from '../assets/FrontGuide.png'
import SideGuide from '../assets/SideGuide.png'
import WomanFront from '../assets/WomanFront.png'
import WomanSide from '../assets/WomanSide.png'
import frontImg from '../assets/front.png'
import sideImg from '../assets/side.png'
import styles from './BodyScan.module.scss'

type ScanPhase = 'initial' | 'scanning' | 'countdown' | 'completed'

export default function BodyScan({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialOrientation =
    searchParams.get('orientation') === 'side' ? 'side' : 'front'
  const [orientation, setOrientation] = useState<'front' | 'side'>(
    initialOrientation
  )
  const [singleScan] = useState(searchParams.get('single') === 'true')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [scanPhase, setScanPhase] = useState<ScanPhase>('initial')
  const [countdown, setCountdown] = useState(5)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [capturedFront, setCapturedFront] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const initialSoundEnabled = useRef(soundEnabled)

  // Pokreni audio prilikom mounta komponente samo jednom. Ovaj efekt ne
  // ovisi o promjenama `soundEnabled`, nego koristi početnu vrijednost
  // spremljenu u referenci kako bi izbjegao zastarjele vrijednosti.
  useEffect(() => {
    const audio = audioRef.current
    if (audio && initialSoundEnabled.current) {
      audio.currentTime = 0
      const playPromise = audio.play()
      playPromiseRef.current = playPromise
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          // Audio playback was prevented or interrupted
          if (err.name !== 'AbortError') {
            console.error('Initial audio playback failed:', err)
          }
        })
      }
    }
    return () => {

      const audio = audioRef.current
      if (audio) {
        // Bezbjedno zaustavi audio tek kad se završi play promise
        if (playPromiseRef.current) {
          playPromiseRef.current.then(() => {
            audio.pause()
          }).catch(() => {
            audio.pause()
          })
        } else {
          audio.pause()
        }
      }
    }
  }, [])

  // Pauziraj/pokreni audio kad se promijeni soundEnabled
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      if (soundEnabled) {
        // Čekaj da se završi prethodni play promise prije pokretanja novog
        if (playPromiseRef.current) {
          playPromiseRef.current.then(() => {
            if (audio && soundEnabled) {
              const playPromise = audio.play()
              playPromiseRef.current = playPromise
              if (playPromise !== undefined) {
                playPromise.catch(err => {
                  if (err.name !== 'AbortError') {
                    console.error('Audio playback failed:', err)
                  }
                })
              }
            }
          }).catch(() => {
            // Ignore errors from previous promise
          })
        } else {
          const playPromise = audio.play()
          playPromiseRef.current = playPromise
          if (playPromise !== undefined) {
            playPromise.catch(err => {
              if (err.name !== 'AbortError') {
                console.error('Audio playback failed:', err)
              }
            })
          }
        }
      } else {
        // Bezbjedno pauziraj tek kad se završi trenutni play promise
        if (playPromiseRef.current) {
          playPromiseRef.current.then(() => {
            if (audio) {
              audio.pause()
            }
          }).catch(() => {
            // Play failed, audio is already stopped
            if (audio) {
              audio.pause()
            }
          })
        } else {
          audio.pause()
        }
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
    // Stop any existing tracks before starting a new scan
    const oldTracks = streamRef.current?.getTracks()
    oldTracks?.forEach(track => track.stop())
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

  const placeholderImage = orientation === 'front' ? WomanFront : WomanSide
  const guideImage = orientation === 'front' ? FrontGuide : SideGuide
  const title = orientation === 'front' ? 'Front Body Scan' : 'Side Body Scan'

  const actionText =
    scanPhase === 'initial'
      ? 'SCAN'
      : orientation === 'front'
        ? singleScan
          ? 'Continue'
          : 'Continue to the Side Scan'
        : 'Continue'

  const handleFooterAction = () => {
    if (scanPhase === 'initial') {
      startScan()
    } else if (scanPhase === 'completed') {
      const tracks = streamRef.current?.getTracks()
      tracks?.forEach(track => track.stop())
      if (videoRef.current) videoRef.current.srcObject = null
      const placeholder = orientation === 'front' ? frontImg : sideImg
      if (singleScan) {
        if (orientation === 'front') {
          setCapturedFront(placeholder)
          navigate('/body-photos-check', { state: { frontImage: placeholder } })
        } else {
          navigate('/body-photos-check', { state: { sideImage: placeholder } })
        }
      } else if (orientation === 'front') {
        setCapturedFront(placeholder)
        setOrientation('side')
        setScanPhase('initial')
        setCountdown(5)
      } else {
        navigate('/body-photos-check', {
          state: {
            frontImage: capturedFront ?? frontImg,
            sideImage: placeholder,
          },
        })
      }
    }
  }

  return (
    <div className={styles.bodyScanPage}>
      {scanPhase === 'initial' && (
        <img
          src={placeholderImage}
          alt={orientation === 'front' ? 'Woman front' : 'Woman side'}
          className={styles.scanImage}
        />
      )}
      <video ref={videoRef} className={styles.video} autoPlay playsInline />
      {scanPhase !== 'initial' && (
        <div className={styles.overlay}>
          <img
            src={guideImage}
            alt={orientation === 'front' ? 'Front guide' : 'Side guide'}
            className={styles.guideImage}
          />
        </div>
      )}
      <Header
        className={styles.scanHeader}
        variant="light"
        title={title}
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
          <div className={styles.scanDoneMsg}>
            <span>{orientation === 'front' ? 'Front Scan Done!' : 'Side Scan Done!'}</span>
          </div>
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

      {/* Prikaži Footer samo kad nije scanning ili countdown */}
      {(scanPhase === 'initial' || scanPhase === 'completed') && (
        <Footer
          className={styles.scanFooter}
          actionText={actionText}
          onAction={handleFooterAction}
          actionDisabled={false}
        />
      )}
    </div>
  )
}