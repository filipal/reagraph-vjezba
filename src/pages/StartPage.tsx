import { useNavigate } from 'react-router-dom'
import './StartPage.css'

export default function StartPage() {
  const navigate = useNavigate()
  return (
    <div className="start-page">
      <h1 className="title">PANDOMOTO WEB</h1>
      <button className="start-button" onClick={() => navigate('/login')}>
        Try On in 3D
      </button>
    </div>
  )
}