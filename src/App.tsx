import { Routes, Route, Navigate } from 'react-router-dom'
import StartPage from './pages/StartPage.tsx'
import LoginPage from './pages/LoginPage'
import LoggedInPage from './pages/LoggedInPage.tsx'
import './App.css'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/logged-in" element={<LoggedInPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}