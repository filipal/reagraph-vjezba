import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'

import avatarsButton from '../assets/AvatarsButton.png'
import rLeft from '../assets/rLeft.svg'
import rRight from '../assets/rRight.svg'
import uploadIcon from '../assets/upload.svg'
import fullScreenIcon from '../assets/FullScreen.svg'
import downloadIcon from '../assets/download.svg'
import unrealFBBodyButton from '../assets/UnrealFBBodyButton.png'
import avatarMeasure from '../assets/UnrealFullBody.png'
import bodyIcon from '../assets/body.png'
import faceIcon from '../assets/face.png'
import skinIcon from '../assets/skin.png'
import hairIcon from '../assets/hair.png'
import extrasIcon from '../assets/extras.png'
import saveIcon from '../assets/save.png'
import lengthIcon from '../assets/length.png'
import girthIcon from '../assets/girth.png'
import styles from './UnrealMeasurements.module.scss'

interface ControlButton {
  key: string
  width: number
  icon: string
  marginRight: number
}

interface NavButton {
  key: NavKey
  icon: string
  label: string
}

interface Measurement {
  name: string
  value: number
  icon: string // Može biti tekst ikona ili slika path
}

type NavKey = 'Body' | 'Face' | 'Skin' | 'Hair' | 'Extras' | 'Save'

export default function UnrealMeasurements() {

  const navigate = useNavigate()

  const [selectedControl, setSelectedControl] = useState<string | null>(null)
  const [selectedNav, setSelectedNav] = useState<NavKey | null>(null)
  const [avatarSrc] = useState<string>(avatarMeasure)

  const measurements: Measurement[] = [
    { name: 'Shoulder', value: 33.3, icon: lengthIcon },
    { name: 'Chest', value: 97.1, icon: girthIcon },
    { name: 'Underchest', value: 88.9, icon: girthIcon },
    { name: 'Waist', value: 79.1, icon: girthIcon },
    { name: 'High Hip', value: 82, icon: girthIcon },
    { name: 'Low Hip', value: 91.8, icon: girthIcon },
    { name: 'Inseam', value: 72.6, icon: lengthIcon },
    { name: 'High Thigh', value: 53.6, icon: girthIcon },
    { name: 'Mid Thigh', value: 49.5, icon: girthIcon },
    { name: 'Knee', value: 35, icon: girthIcon },
    { name: 'Calf', value: 36.1, icon: girthIcon },
    { name: 'Ankle', value: 19.9, icon: girthIcon },
    { name: 'Foot Length', value: 24.4, icon: lengthIcon },
    { name: 'Foot Breadth', value: 8.9, icon: lengthIcon },
    { name: 'Bicep', value: 32.1, icon: girthIcon },
    { name: 'Forearm', value: 26.5, icon: girthIcon },
    { name: 'Wrist', value: 15.9, icon: girthIcon },
    { name: 'Shoulder to Wrist', value: 56.7, icon: lengthIcon },
    { name: 'Hand Length', value: 18.3, icon: lengthIcon },
    { name: 'Hand Breadth', value: 8.1, icon: lengthIcon },
    { name: 'Neck', value: 37.3, icon: girthIcon },
    { name: 'Head', value: 54.5, icon: girthIcon },
    { name: 'Height', value: 170.5, icon: lengthIcon }
  ]

  const controls: ControlButton[] = [
    { key: 'rotate-left', width: 60, icon: rLeft, marginRight: 50 },
    { key: 'upload', width: 50, icon: uploadIcon, marginRight: 25 },
    { key: 'fullscreen', width: 40, icon: fullScreenIcon, marginRight: 25 },
    { key: 'download', width: 50, icon: downloadIcon, marginRight: 50 },
    { key: 'rotate-right', width: 60, icon: rRight, marginRight: 0 },
  ]

  const navButtons: NavButton[] = [
    { key: 'Body', icon: bodyIcon, label: 'Body' },
    { key: 'Face', icon: faceIcon, label: 'Face' },
    { key: 'Skin', icon: skinIcon, label: 'Skin' },
    { key: 'Hair', icon: hairIcon, label: 'Hair' },
    { key: 'Extras', icon: extrasIcon, label: 'Extras' },
    { key: 'Save', icon: saveIcon, label: 'Save' },
  ]

  const avatarImage = selectedNav === 'Body' ? unrealFBBodyButton : avatarSrc
  
  return (
    <div className={styles.page}>
      <Header
        title="Unreal Measurements"
        variant="dark"
        onExit={() => navigate('/')}
        rightContent={(
          <button className={styles.avatarButton} onClick={() => navigate('/logged-in')} type="button">
            <img src={avatarsButton} alt="Avatars" />
          </button>
        )}
      />

      <div className={styles.centralWrapper}>
        <div className={`${styles.avatarSection} ${selectedNav === 'Body' ? styles.bodySelected : ''}`}>
          <img src={avatarImage} alt="Avatar" className={styles.avatarImage} />

          {selectedNav === 'Body' && (
            <>
              <div className={styles.dataPanelHeader}>
                <h3>Body Measurements (cm)</h3>
              </div>
              <div className={styles.dataPanelContent}>
                <div className={styles.measurementsList}>
                  {measurements.map((measurement, index) => (
                    <div key={index} className={styles.measurementItem}>
                      <span className={styles.measurementIcon}>
                        <img src={measurement.icon} alt="" />
                      </span>
                      <span className={styles.measurementName}>{measurement.name}</span>
                      <span className={styles.measurementValue}>{measurement.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className={styles.controlGroup}>
            {controls.map(control => (
              <button
                key={control.key}
                className={`${styles.controlButton} ${styles[control.key.replace('-', '')]} ${selectedControl === control.key ? styles.selected : ''}`}
                style={{ width: control.width, marginRight: control.marginRight }}
                onClick={() => setSelectedControl(control.key)}
                type="button"
              >
                <img src={control.icon} alt="" className={styles.controlIcon} />
              </button>
            ))}
          </div>
        </div>

        {selectedNav === 'Body' && <div className={styles.accordion}>Accordion placeholder</div>}
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.bottomNav}>
          {navButtons.map(btn => (
            <button
              key={btn.key}
              className={`${styles.navButton} ${selectedNav === btn.key ? styles.active : ''}`}
              onClick={() => setSelectedNav(btn.key)}
              type="button"
            >
              <div className={styles.navIndicator} />
              <div className={styles.navIcon}>
                <img src={btn.icon} alt={btn.label} />
              </div>
              <span className={styles.navLabel}>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
