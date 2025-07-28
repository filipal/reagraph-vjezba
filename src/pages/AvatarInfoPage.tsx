import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import leftArrow from '../assets/arrow left.svg'
import rightArrow from '../assets/arrow right.svg'
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
  const age = usePicker(2, ages)
  const height = usePicker(2, heights)
  const weight = usePicker(2, weights)

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
      <button className="close-button" onClick={() => navigate('/')}>×</button>
      <h1 className="title">Avatar Info</h1>
      {renderPicker('Age Range', age, ages)}
      {renderPicker('Height', height, heights)}
      {renderPicker('Weight', weight, weights)}
      <div className="actions">
        <button className="scan-button" onClick={() => navigate('/logged-in')}>
          Scan Body
        </button>
        <button className="quick-button" onClick={() => navigate('/logged-in')}>
          Quick Mode
        </button>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  )
}