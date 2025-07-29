import { Routes, Route, Navigate } from 'react-router-dom'
import StartPage from './pages/StartPage.tsx'
import LoginPage from './pages/LoginPage'
import LoggedInPage from './pages/LoggedInPage.tsx'
import AvatarInfoPage from './pages/AvatarInfoPage'
import UseOfData from './pages/UseOfData'
import QuickMode from './pages/QuickMode'
import './App.css'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/avatar-info" element={<AvatarInfoPage />} />
      <Route path="/logged-in" element={<LoggedInPage />} />
      <Route path="/use-of-data" element={<UseOfData />} />
      <Route path="/quickmode" element={<QuickMode />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}