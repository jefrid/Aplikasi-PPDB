import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import HalamanBeranda from './pages/Home'
import HalamanTentangKami from './pages/About'
import HalamanProgram from './pages/Programs'
import HalamanAcara from './pages/Acara'
import HalamanPengajar from './pages/Pengajar'
import DetailAcara from './pages/DetailAcara'
import HalamanKontak from './pages/Kontak'
import Login from './pages/Login'
import Register from './pages/Register'
import ParentDashboard from './pages/ParentDashboard'
import StudentRegistration from './pages/dashboard/StudentRegistration'
import EditPendaftaran from './pages/EditPendaftaran'
import DaftarAcara from './pages/admin/DaftarAcara'
import TambahAcara from './pages/admin/TambahAcara'
import HalamanPendaftaran from './pages/Pendaftaran'
import DaftarPengajar from './pages/admin/DaftarPengajar'
import TambahPengajar from './pages/admin/TambahPengajar'
import DaftarMurid from './pages/admin/DaftarMurid'
import TambahMurid from './pages/admin/TambahMurid'
import DetailVerifikasi from './pages/admin/DetailVerifikasi'
import VerifikasiMurid from './pages/admin/VerifikasiMurid'
import Dashboard from './pages/admin/Dashboard'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HalamanBeranda />} />
            <Route path="tentang-kami" element={<HalamanTentangKami />} />
            <Route path="program" element={<HalamanProgram />} />
            <Route path="pengajar" element={<HalamanPengajar />} />
            <Route path="acara" element={<HalamanAcara />} />
            <Route path="acara/:slug" element={<DetailAcara />} />
            <Route path="kontak" element={<HalamanKontak />} />
            <Route path="pendaftaran" element={<HalamanPendaftaran />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Parent Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="wali_murid">
                <ParentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/daftar"
            element={
              <ProtectedRoute requiredRole="wali_murid">
                <StudentRegistration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-pendaftaran/:id"
            element={
              <ProtectedRoute requiredRole="wali_murid">
                <EditPendaftaran />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/acara"
            element={
              <ProtectedRoute requiredRole="admin">
                <DaftarAcara />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/acara/tambah"
            element={
              <ProtectedRoute requiredRole="admin">
                <TambahAcara />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/acara/edit/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <TambahAcara />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pengajar"
            element={
              <ProtectedRoute requiredRole="admin">
                <DaftarPengajar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pengajar/tambah"
            element={
              <ProtectedRoute requiredRole="admin">
                <TambahPengajar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pengajar/edit/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <TambahPengajar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/murid"
            element={
              <ProtectedRoute requiredRole="admin">
                <DaftarMurid />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/murid/edit/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <TambahMurid />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/verifikasi"
            element={
              <ProtectedRoute requiredRole="admin">
                <VerifikasiMurid />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/verifikasi/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <DetailVerifikasi />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}