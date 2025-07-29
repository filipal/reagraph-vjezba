import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import leftArrow from '../assets/arrow left.svg'
import rightArrow from '../assets/arrow right.svg'
import cameraIcon from '../assets/camera.png'
import quickIcon from '../assets/quick.png'
import infoIcon from '../assets/infoButton.svg'
import exitIcon from '../assets/exit.svg'
import './AvatarInfoPage.css'

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
    <div className="picker">
      <span className="picker-label">{label}</span>
      <div className="picker-control">
        <button className="arrow-button" onClick={state.prev}>
          <img src={leftArrow} alt="previous" />
        </button>
        <div className="picker-values">
          {values[state.index - 1] && (
            <span className="picker-value side">{values[state.index - 1]}</span>
          )}
          <span className="picker-value selected">{values[state.index]}</span>
          {values[state.index + 1] && (
            <span className="picker-value side">{values[state.index + 1]}</span>
          )}
        </div>
        <button className="arrow-button" onClick={state.next}>
          <img src={rightArrow} alt="next" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="avatar-info-page">
      <header className="header">
      <button className="back-button" onClick={() => navigate('/')}> 
        <img src={exitIcon} alt="Exit" className="exit-icon" width={20} height={20} />
      </button>
        <h1 className="title">Create your Avatar</h1>
        <button className="info-button" onClick={() => navigate('/use-of-data')}>
          <img src={infoIcon} alt="Info" />
        </button>
      </header>
      <div className="form-section">
        <input
          className="avatar-name-input"
          type="text"
          placeholder="Avatar’s Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className="gender-choice">
          <button
            className={`gender-button${gender === 'male' ? ' selected' : ''}`}
            onClick={() => setGender('male')}
            type="button"
          >
            Male
          </button>
          <button
            className={`gender-button${gender === 'female' ? ' selected' : ''}`}
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
      <div className="how-text">How would you like to create your avatar?</div>
      <button className="scan-button" onClick={() => navigate('/logged-in')}>
        <img src={cameraIcon} alt="" className="button-icon" />
        Scan Body
      </button>
      <div className="scan-desc">
        Highly accurate. Scan your body & face<br />
        with a phone in 3 minutes.
      </div>
      <button className="quick-button" onClick={() => navigate('/logged-in')}>
        <img src={quickIcon} alt="" className="button-icon" />
        Quick Mode
      </button>
      <div className="quick-desc">
        Fastest, but may not be as accurate.<br />
        Enter main body measurements and choose your body type.
      </div>
      <button className="back-button-avatarinfo" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  )
}