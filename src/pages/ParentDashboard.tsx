
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { RegistrationService } from '../services/RegistrationService'
import type { PendaftaranWithRelations } from '../types'
import ParentLayout from '../components/ParentLayout'
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  X,
  Clock,
  AlertCircle,
  RefreshCw,
  Loader2
} from 'lucide-react'

type ActiveSection = 'dashboard' | 'children'

export default function ParentDashboard() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard')
  const [pendaftaranList, setPendaftaranList] = useState<PendaftaranWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  // Handle URL query parameters for navigation
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const view = params.get('view')
    if (view === 'children') {
      setActiveSection('children')
    } else {
      setActiveSection('dashboard')
    }
  }, [location.search])

  // Fetch data on component mount
  useEffect(() => {
    if (user) {
      fetchData()

      // Safety timeout - force loading to stop after 10 seconds
      const timeout = setTimeout(() => {
        if (loading) {
          console.warn('⚠️ Loading timeout reached, forcing loading to stop')
          setLoading(false)
        }
      }, 10000)

      return () => clearTimeout(timeout)
    }
  }, [user])

  const fetchData = async () => {
    try {
      setLoading(true)

      if (user) {
        // Fetch pendaftaran untuk user yang sedang login
        const pendaftaran = await RegistrationService.getByUserId(user.id)
        setPendaftaranList(pendaftaran)
      }
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleHapusPendaftaran = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pendaftaran ini?')) return

    try {
      await RegistrationService.delete(id)
      await fetchData()
    } catch (err: any) {
      console.error('Error deleting pendaftaran:', err)
      const errorMessage = err?.message || 'Gagal menghapus pendaftaran.'
      setError(`Gagal menghapus: ${errorMessage}`)
      alert(`Gagal menghapus pendaftaran: ${errorMessage}`)
    }
  }

  if (loading) {
    return (
      <ParentLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">Memuat data...</p>
          </div>
        </div>
      </ParentLayout>
    )
  }

  return (
    <ParentLayout>
      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Error Memuat Data</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={fetchData}
                className="mt-2 inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'dashboard' && (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Wali Murid</h2>
            <p className="text-gray-600">Selamat datang di dashboard wali murid TPQ Al-Ikhlas.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Pendaftaran</dt>
                      <dd className="text-lg font-medium text-gray-900">{pendaftaranList.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Diterima</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {pendaftaranList.filter(p => p.status === 'diterima').length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Menunggu Verifikasi</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {pendaftaranList.filter(p => p.status === 'menunggu_verifikasi').length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Aksi Cepat</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Link
                  to="/dashboard/daftar"
                  className="relative block w-full bg-white p-6 border-2 border-gray-300 border-dashed rounded-lg text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Plus className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">Daftar Anak Baru</span>
                </Link>
                <button
                  onClick={() => setActiveSection('children')}
                  className="relative block w-full bg-white p-6 border-2 border-gray-300 border-dashed rounded-lg text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Edit className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-medium text-gray-900">Kelola Pendaftaran</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'children' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Data Anak</h1>
            <Link
              to="/dashboard/daftar"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Daftar Anak Baru
            </Link>
          </div>

          <div className="grid gap-6">
            {pendaftaranList.map((pendaftaran) => (
              <div
                key={pendaftaran.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-[120px,1fr,auto] gap-6">
                  {/* Status */}
                  {/* Status & Foto */}
                  <div className="h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative overflow-hidden group">
                    {pendaftaran.berkas_siswa?.find(b => b.jenis_dokumen === 'foto_anak')?.url_file ? (
                      <img
                        src={pendaftaran.berkas_siswa.find(b => b.jenis_dokumen === 'foto_anak')?.url_file}
                        alt={pendaftaran.nama_siswa}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      pendaftaran.status === 'diterima' ? (
                        <CheckCircle className="w-12 h-12 text-white" />
                      ) : pendaftaran.status === 'ditolak' ? (
                        <X className="w-12 h-12 text-white" />
                      ) : (
                        <Clock className="w-12 h-12 text-white" />
                      )
                    )}
                    {/* Status Badge overlay for photo */}
                    {pendaftaran.berkas_siswa?.find(b => b.jenis_dokumen === 'foto_anak')?.url_file && (
                      <div className={`absolute bottom-0 inset-x-0 p-2 text-xs font-bold text-center text-white ${pendaftaran.status === 'diterima'
                        ? 'bg-green-600/90'
                        : pendaftaran.status === 'ditolak'
                          ? 'bg-red-600/90'
                          : 'bg-yellow-600/90'
                        }`}>
                        {pendaftaran.status === 'menunggu_verifikasi' ? 'Menunggu' :
                          pendaftaran.status === 'diterima' ? 'Diterima' : 'Ditolak'}
                      </div>
                    )}
                  </div>

                  {/* Informasi Pendaftaran */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {pendaftaran.nama_siswa}
                        </h2>
                        <div className="flex items-center text-blue-600 font-medium mb-2">
                          <Calendar className="w-5 h-5 mr-2" />
                          Lahir: {pendaftaran.tempat_lahir}, {pendaftaran.tanggal_lahir ? new Date(pendaftaran.tanggal_lahir).toLocaleDateString('id-ID') : 'Belum diisi'}
                        </div>
                        <div className="text-sm text-gray-500">
                          Terdaftar: {new Date(pendaftaran.created_at).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline - flex items - center px - 3 py - 1 rounded - full text - sm font - medium ${pendaftaran.status === 'diterima'
                          ? 'bg-green-100 text-green-800'
                          : pendaftaran.status === 'ditolak'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                          } `}>
                          {pendaftaran.status === 'menunggu_verifikasi' ? 'Menunggu Verifikasi' :
                            pendaftaran.status === 'diterima' ? 'Diterima' : 'Ditolak'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pendaftaran.alamat_rumah && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-5 h-5 mr-2" />
                          {pendaftaran.alamat_rumah}
                        </div>
                      )}
                      <div className="flex items-center text-gray-600">
                        <Users className="w-5 h-5 mr-2" />
                        {pendaftaran.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                      </div>
                    </div>

                    {pendaftaran.catatan_admin && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Catatan Admin:</strong> {pendaftaran.catatan_admin}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Aksi */}
                  <div className="p-6 md:p-8 flex md:flex-col justify-end space-x-4 md:space-x-0 md:space-y-4">
                    <Link
                      to={`/edit-pendaftaran/${pendaftaran.id}`}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleHapusPendaftaran(pendaftaran.id)}
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {pendaftaranList.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada pendaftaran</h3>
                <p className="text-gray-500">Daftarkan anak Anda untuk memulai proses pendaftaran PAUD</p>
                <Link
                  to="/dashboard/daftar"
                  className="mt-4 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Daftar Anak Sekarang
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </ParentLayout>
  )
}