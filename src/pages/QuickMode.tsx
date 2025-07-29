import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import exitIcon from '../assets/exit.svg'
import infoIcon from '../assets/InfoButton.svg'
import BodyShape1 from '../assets/BodyShape_1.svg?react'
import BodyShape2 from '../assets/BodyShape_2.svg?react'
import BodyShape3 from '../assets/BodyShape_3.svg?react'
import BodyShape4 from '../assets/BodyShape_4.svg?react'
import BodyShape5 from '../assets/BodyShape_5.svg?react'
import athleticTrack from '../assets/AthleticSlide.svg'
import athleticCircle from '../assets/AthleticCircle.svg'
import athleticThin from '../assets/AthleticThin.svg'
import athleticNormal from '../assets/AthleticNormal.svg'
import athleticMuscular from '../assets/AthleticMuscular.svg'
import './QuickMode.css'

const bodyShapes = [
  { id: 1, Icon: BodyShape1, label: 'Shape 1' },
  { id: 2, Icon: BodyShape2, label: 'Shape 2' },
  { id: 3, Icon: BodyShape3, label: 'Shape 3' },
  { id: 4, Icon: BodyShape4, label: 'Shape 4' },
  { id: 5, Icon: BodyShape5, label: 'Shape 5' },
]

const measurementOptions = Array.from({ length: 100 }, (_, i) => (60 + i).toString())

export default function QuickMode() {
  const navigate = useNavigate()

  const [selectedBodyShape, setSelectedBodyShape] = useState(3)
  const [athleticLevel, setAthleticLevel] = useState(1) // 0, 1, 2
  const [bustCircumference, setBustCircumference] = useState('')
  const [waistCircumference, setWaistCircumference] = useState('')
  const [lowHipCircumference, setLowHipCircumference] = useState('')

  // Helper to get slider value from X position
  const getSliderValue = (clientX: number, slider: HTMLDivElement | null) => {
    if (!slider) return athleticLevel
    const rect = slider.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = x / rect.width
    const newLevel = Math.round(percentage * 2)
    return Math.max(0, Math.min(2, newLevel))
  }

  // Mouse events
  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const slider = e.currentTarget as HTMLDivElement
    const newLevel = getSliderValue(e.clientX, slider)
    setAthleticLevel(newLevel)
    window.addEventListener('mousemove', handleSliderMouseMove)
    window.addEventListener('mouseup', handleSliderMouseUp)
  }

  const handleSliderMouseMove = (e: MouseEvent) => {
    const slider = document.getElementById('athletic-slider-track') as HTMLDivElement | null
    if (!slider) return
    const newLevel = getSliderValue(e.clientX, slider)
    setAthleticLevel(newLevel)
  }

  const handleSliderMouseUp = () => {
    window.removeEventListener('mousemove', handleSliderMouseMove)
    window.removeEventListener('mouseup', handleSliderMouseUp)
  }

  // Touch events
  const handleSliderTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const slider = e.currentTarget as HTMLDivElement
    const touch = e.touches[0]
    const newLevel = getSliderValue(touch.clientX, slider)
    setAthleticLevel(newLevel)
    window.addEventListener('touchmove', handleSliderTouchMove)
    window.addEventListener('touchend', handleSliderTouchEnd)
  }

  const handleSliderTouchMove = (e: TouchEvent) => {
    const slider = document.getElementById('athletic-slider-track') as HTMLDivElement | null
    if (!slider) return
    const touch = e.touches[0]
    const newLevel = getSliderValue(touch.clientX, slider)
    setAthleticLevel(newLevel)
  }

  const handleSliderTouchEnd = () => {
    window.removeEventListener('touchmove', handleSliderTouchMove)
    window.removeEventListener('touchend', handleSliderTouchEnd)
  }

  return (
    <div className="quickmode-page">
      {/* Header */}
      <header className="header">
        <button className="icon-button" onClick={() => navigate(-1)}>
          <img src={exitIcon} alt="Exit" className="exit-icon" width={20} height={20} />
        </button>
        <h1 className="header-title">Body Shape & Fitness</h1>
        <button className="info-button" onClick={() => navigate('/use-of-data')}>
          <img src={infoIcon} alt="Info" />
        </button>
      </header>

      <div className="quickmode-content">
        {/* Body Shape */}
        <div className="section">
          <div className="section-label">What’s your body shape?</div>
          <div className="bodyshape-row">
            {bodyShapes.map((shape) => (
              <button
                key={shape.id}
                className="bodyshape-btn"
                onClick={() => setSelectedBodyShape(shape.id)}
                aria-label={shape.label}
                type="button"
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <shape.Icon
                  fill={selectedBodyShape === shape.id ? '#000' : '#fff'}
                  style={{ display: 'block', width: 56, height: 56 }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Athletic Level */}
        <div className="section">
          <div className="section-label">How athletic are you?</div>
        <div className="athletic-slider-wrap">
          <div
            id="athletic-slider-track"
            className="athletic-slider-track"
            onMouseDown={handleSliderMouseDown}
            onTouchStart={handleSliderTouchStart}
            style={{ touchAction: 'none' }}
          >
            <img src={athleticTrack} alt="" className="athletic-track" />
            <img
              src={athleticCircle}
              alt=""
              className="athletic-circle"
              style={{ left: `calc(${athleticLevel * 50}% - 16px)` }}
              draggable={false}
            />
          </div>
          <div className="athletic-icons">
            <img src={athleticThin} alt="Thin" />
            <img src={athleticNormal} alt="Normal" />
            <img src={athleticMuscular} alt="Muscular" />
          </div>
        </div>
        </div>

        {/* Measurements */}
        <div className="section">
          <div className="measure-row">
            <div className="measure-label">Bust Circumference</div>
            <select
              value={bustCircumference}
              onChange={e => setBustCircumference(e.target.value)}
              className="measure-select"
            >
              <option value="">...</option>
              {measurementOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <span className="measure-unit">cm</span>
          </div>
          <div className="measure-row">
            <div className="measure-label">Waist Circumference</div>
            <select
              value={waistCircumference}
              onChange={e => setWaistCircumference(e.target.value)}
              className="measure-select"
            >
              <option value="">...</option>
              {measurementOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <span className="measure-unit">cm</span>
          </div>
          <div className="measure-row">
            <div className="measure-label">Low Hip Circumference</div>
            <select
              value={lowHipCircumference}
              onChange={e => setLowHipCircumference(e.target.value)}
              className="measure-select"
            >
              <option value="">...</option>
              {measurementOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <span className="measure-unit">cm</span>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="quickmode-footer">
        <button className="button-back" onClick={() => navigate('/avatar-info')}>
          Back
        </button>
        <button
          className="button-generate"
          onClick={() => navigate('/unreal-measurements')}
        >
          Generate Avatar
        </button>
      </div>
    </div>
  )
}