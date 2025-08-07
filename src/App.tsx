import { Routes, Route, Navigate } from 'react-router-dom'
import StartPage from './pages/StartPage.tsx'
import LoginPage from './pages/LoginPage'
import LoggedInPage from './pages/LoggedInPage.tsx'
import AvatarInfoPage from './pages/AvatarInfoPage'
import UseOfData from './pages/UseOfData'
import QuickMode from './pages/QuickMode'
import BodyScanInfo from './pages/BodyScanInfo.tsx'
import BodyScan from './pages/BodyScan.tsx'
import UnrealMeasurements from './pages/UnrealMeasurements.tsx'
import ScanQRBodyscan from './pages/ScanQRBodyscan.tsx'
import BodyPhotosCheck from './pages/BodyPhotosCheck.tsx'
import './App.module.scss'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/avatar-info" element={<AvatarInfoPage />} />
      <Route path="/logged-in" element={<LoggedInPage />} />
      <Route path="/use-of-data" element={<UseOfData />} />
      <Route path="/body-scan-info" element={<BodyScanInfo />} />
      <Route path="/quickmode" element={<QuickMode />} />
      <Route path="/body-scan" element={<BodyScan />} />
      <Route path="/unreal-measurements" element={<UnrealMeasurements />} />
      <Route path="/scan-qr-bodyscan" element={<ScanQRBodyscan />} />
      <Route path="/body-photos-check" element={<BodyPhotosCheck />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}