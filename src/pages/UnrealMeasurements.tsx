import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'

import avatarsButton from '../assets/AvatarsButton.png'
import rLeft from '../assets/rLeft.png'
import rRight from '../assets/rRight.png'
import uploadIcon from '../assets/upload.png'
import fullScreenIcon from '../assets/FullScreen.png'
import downloadIcon from '../assets/download.png'
import ellipseLs from '../assets/EllipseLs.png'
import ellipseLb from '../assets/EllipseLb.png'
import ellipseMs from '../assets/EllipseMs.png'
import ellipseMb from '../assets/EllipseMb.png'
import ellipseSs from '../assets/EllipseSs.png'
import ellipseSb from '../assets/EllipseSb.png'
import unrealFBBodyButton from '../assets/UnrealFBBodyButton.png'
import avatarMeasure from '../assets/AvatarMeasure.png'
import bodyIcon from '../assets/body.png'
import faceIcon from '../assets/face.png'
import skinIcon from '../assets/SKIN.png'
import hairIcon from '../assets/HAIR.png'
import extrasIcon from '../assets/EXTRAS.png'
import saveIcon from '../assets/save.png'
import styles from './UnrealMeasurements.module.scss'

interface ControlButton {
  key: string
  width: number
  icon: string
  ellipseWhite: string
  ellipseBlack: string
  marginRight: number
}

interface NavButton {
  key: NavKey
  icon: string
  label: string
}

type NavKey = 'Body' | 'Face' | 'Skin' | 'Hair' | 'Extras' | 'Save'

export default function UnrealMeasurements() {

  const navigate = useNavigate()

  const [selectedControl, setSelectedControl] = useState<string | null>(null)
  const [selectedNav, setSelectedNav] = useState<NavKey>('Body')
  const [avatarSrc] = useState<string>(avatarMeasure)

  const controls: ControlButton[] = [
    { key: 'rotate-left', width: 60, icon: rLeft, ellipseWhite: ellipseLs, ellipseBlack: ellipseLb, marginRight: 50 },
    { key: 'upload', width: 50, icon: uploadIcon, ellipseWhite: ellipseMs, ellipseBlack: ellipseMb, marginRight: 25 },
    { key: 'fullscreen', width: 40, icon: fullScreenIcon, ellipseWhite: ellipseSs, ellipseBlack: ellipseSb, marginRight: 25 },
    { key: 'download', width: 50, icon: downloadIcon, ellipseWhite: ellipseMs, ellipseBlack: ellipseMb, marginRight: 50 },
    { key: 'rotate-right', width: 60, icon: rRight, ellipseWhite: ellipseLs, ellipseBlack: ellipseLb, marginRight: 0 },
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

          {selectedNav === 'Body' && <div className={styles.dataPanel}>Data panel</div>}

          <div className={styles.controlGroup}>
            {controls.map(control => (
              <button
                key={control.key}
                className={`${styles.controlButton} ${styles[control.key.replace('-', '')]}`}
                style={{ width: control.width, marginRight: control.marginRight }}
                onClick={() => setSelectedControl(control.key)}
                type="button"
              >
                <img
                  src={selectedControl === control.key ? control.ellipseBlack : control.ellipseWhite}
                  alt=""
                  className={styles.ellipse}
                />
                <img src={control.icon} alt="" className={styles.controlIcon} />
              </button>
            ))}
          </div>
        </div>

        {selectedNav === 'Body' && <div className={styles.accordion}>Accordion placeholder</div>}
      </div>

      <div className={styles.bottomNav}>
        {navButtons.map(btn => (
          <button
            key={btn.key}
            className={`${styles.navButton} ${selectedNav === btn.key ? styles.active : ''}`}
            onClick={() => setSelectedNav(btn.key)}
            type="button"
          >
            <div className={styles.navIndicator} />
            <img src={btn.icon} alt={btn.label} className={styles.navIcon} />
            <span className={styles.navLabel}>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
