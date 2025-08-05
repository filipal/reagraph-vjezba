import { Routes, Route, Navigate } from 'react-router-dom'
import StartPage from './pages/StartPage.tsx'
import LoginPage from './pages/LoginPage'
import LoggedInPage from './pages/LoggedInPage.tsx'
import AvatarInfoPage from './pages/AvatarInfoPage'
import UseOfData from './pages/UseOfData'
import QuickMode from './pages/QuickMode'
import BodyScanInfo from './pages/BodyScanInfo.tsx'
import FrontBodyScan from './pages/FrontBodyScan.tsx'
import UnrealMeasurements from './pages/UnrealMeasurements.tsx'
import ScanQRBodyscan from './pages/ScanQRBodyscan.tsx'
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
      <Route path="/front-body-scan" element={<FrontBodyScan />} />
      <Route path="/unreal-measurements" element={<UnrealMeasurements />} />
      <Route path="/scan-qr-bodyscan" element={<ScanQRBodyscan />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}