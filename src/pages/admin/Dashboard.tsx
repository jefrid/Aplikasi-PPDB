import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useEvents } from '../../hooks/useEvents'
import { useStudents, useTeachers } from '../../hooks/useStudents'
import { useRegistration } from '../../hooks/useRegistration'
import AdminLayout from '../../components/AdminLayout'
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  UserCheck,
  GraduationCap,
  CheckCircle,
  Loader2,
} from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signOut } = useAuth()

  // Hooks for data fetching
  const { events, loading: eventsLoading, deleteEvent } = useEvents()
  const { students, loading: studentsLoading } = useStudents()
  const { teachers, loading: teachersLoading } = useTeachers()
  const { registrations, loading: registrationsLoading } = useRegistration()

  const loading = eventsLoading || studentsLoading || teachersLoading || registrationsLoading

  const handleHapusAcara = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus acara ini?')) {
      try {
        await deleteEvent(id)
        alert('Acara berhasil dihapus')
      } catch (error) {
        console.error('Error deleting acara:', error)
        alert('Gagal menghapus acara')
      }
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
      alert('Gagal logout')
    }
  }

  if (loading) {
    return (
      <AdminLayout activeSection="dashboard">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
            <p className="text-gray-600">Memuat data...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout activeSection="dashboard">
      <div className="space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{events.length}</h3>
                <p className="text-gray-600">Total Acara</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{teachers.length}</h3>
                <p className="text-gray-600">Total Pengajar</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{students.length}</h3>
                <p className="text-gray-600">Total Murid</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {registrations.filter(r => r.status === 'menunggu_verifikasi').length}
                </h3>
                <p className="text-gray-600">Menunggu Verifikasi</p>
              </div>
            </div>
          </div>


        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/admin/verifikasi"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl p-6 hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200"
          >
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Verifikasi Murid</h3>
                <p className="text-yellow-100">Setujui/tolak pendaftaran</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/acara/tambah"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
          >
            <div className="flex items-center">
              <Plus className="w-8 h-8 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Tambah Acara</h3>
                <p className="text-blue-100">Buat acara baru</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/pengajar/tambah"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 hover:from-green-600 hover:to-green-700 transition-all duration-200"
          >
            <div className="flex items-center">
              <UserCheck className="w-8 h-8 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Tambah Pengajar</h3>
                <p className="text-green-100">Tambah pengajar baru</p>
              </div>
            </div>
          </Link>


        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Events */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Acara Terdekat</h2>
              <Link
                to="/admin/acara"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="space-y-4">
              {events.slice(0, 3).map((acara) => (
                <div key={acara.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-12 bg-blue-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                    {acara.gambar_url ? (
                      <img
                        src={acara.gambar_url}
                        alt={acara.judul}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80'
                        }}
                      />
                    ) : (
                      <Calendar className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{acara.judul}</h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(acara.tanggal_pelaksanaan).toLocaleDateString('id-ID')} • {acara.lokasi || 'Lokasi belum ditentukan'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/acara/edit/${acara.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleHapusAcara(acara.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <p className="text-gray-500 text-center py-8">Belum ada acara yang dibuat</p>
              )}
            </div>
          </div>

          {/* Recent Students */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Murid Terbaru</h2>
              <Link
                to="/admin/murid"
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="space-y-4">
              {students.slice(0, 5).map((murid) => (
                <div key={murid.id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {murid.pendaftaran?.nama_siswa || 'Nama tidak tersedia'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {murid.kelas || 'Kelas belum ditentukan'}
                    </p>
                  </div>
                </div>
              ))}
              {students.length === 0 && (
                <p className="text-gray-500 text-center py-8">Belum ada murid terdaftar</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}