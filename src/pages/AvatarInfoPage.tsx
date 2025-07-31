import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import leftArrow from '../assets/arrow left.svg'
import rightArrow from '../assets/arrow right.svg'
import cameraIcon from '../assets/camera.png'
import quickIcon from '../assets/quick.png'
import Header from '../components/Header'
import styles from './AvatarInfoPage.module.scss'

const ages = ['18-24', '25-30', '31-40', '41-50', '51+']
const heights = ['150', '160', '170', '180', '190']
const weights = ['50', '60', '70', '80', '90']

function usePicker(initial: number, values: string[]) {
  const [index, setIndex] = useState(initial)
  const prev = () => setIndex((i) => (i > 0 ? i - 1 : i))
  const next = () => setIndex((i) => (i < values.length - 1 ? i + 1 : i))
  return { index, prev, next }
}

export default function AvatarInfoPage() {
  const navigate = useNavigate()
  const age = usePicker(1, ages)
  const height = usePicker(2, heights)
  const weight = usePicker(2, weights)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [name, setName] = useState('')

  const renderPicker = (
    label: string,
    state: ReturnType<typeof usePicker>,
    values: string[],
  ) => (
    <div className={styles.picker}>
      <span className={styles.pickerLabel}>{label}</span>
      <div className={styles.pickerControl}>
        <button className={styles.arrowButton} onClick={state.prev}>
          <img src={leftArrow} alt="previous" />
        </button>
        <div className={styles.pickerValues}>
          {values[state.index - 1] && (
            <span className={`${styles.pickerValue} ${styles.side}`}>{values[state.index - 1]}</span>
          )}
          <span className={`${styles.pickerValue} ${styles.selected}`}>{values[state.index]}</span>
          {values[state.index + 1] && (
            <span className={`${styles.pickerValue} ${styles.side}`}>{values[state.index + 1]}</span>
          )}
        </div>
        <button className={styles.arrowButton} onClick={state.next}>
          <img src={rightArrow} alt="next" />
        </button>
      </div>
    </div>
  )

  return (
    <div className={styles.avatarInfoPage}>
      <Header
        title="Create your Avatar"
        onExit={() => navigate('/')}
        onInfo={() => navigate('/use-of-data')}
      />
      <div className={styles.formSection}>
        <input
          className={styles.avatarNameInput}
          type="text"
          placeholder="Avatar’s Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className={styles.genderChoice}>
          <button
            className={`${styles.genderButton}${gender === 'male' ? ' ' + styles.selected : ''}`}
            onClick={() => setGender('male')}
            type="button"
          >
            Male
          </button>
          <button
            className={`${styles.genderButton}${gender === 'female' ? ' ' + styles.selected : ''}`}
            onClick={() => setGender('female')}
            type="button"
          >
            Female
          </button>
        </div>
      </div>
      {renderPicker('Your Age Range:', age, ages)}
      {renderPicker('Your Height:', height, heights)}
      {renderPicker('Your Weight:', weight, weights)}
      <div className={styles.howText}>How would you like to create your avatar?</div>
        <button className={styles.scanButton} onClick={() => {
        navigate('/body-scan-info')
        }}>
        <img src={cameraIcon} alt="" className={styles.buttonIcon} />
        Scan Body
      </button>
      <div className={styles.scanDesc}>
        Highly accurate. Scan your body & face<br />
        with a phone in 3 minutes.
      </div>
      <button className={styles.quickButton} onClick={() => navigate('/quickmode')}>
        <img src={quickIcon} alt="" className={styles.buttonIcon} />
        Quick Mode
      </button>
      <div className={styles.quickDesc}>
        Fastest, but may not be as accurate.<br />
        Enter main body measurements and choose your body type.
      </div>
      <button className={styles.backButtonAvatarinfo} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  )
}