import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { StudentService } from '../../services/StudentService'
import type { StudentWithPendaftaran } from '../../types'
import AdminLayout from '../../components/AdminLayout'
import { downloadStudentData } from '../../utils/downloadUtils'
import {
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Loader2,
  GraduationCap,
  PowerOff,
  Search,
  Download
} from 'lucide-react'

export default function DaftarMurid() {
  const [muridList, setMuridList] = useState<StudentWithPendaftaran[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const muridData = await StudentService.getAll()
      setMuridList(muridData)
    } catch (error) {
      console.error('Error fetching murid:', error)
      setMuridList([])
    } finally {
      setLoading(false)
    }
  }

  // State for download
  const [downloadingId, setDownloadingId] = useState<number | null>(null)

  const handleDownload = async (student: StudentWithPendaftaran) => {
    try {
      setDownloadingId(student.id)
      await downloadStudentData(student)
      alert('Berhasil mengunduh data siswa')
    } catch (error) {
      console.error('Download error:', error)
      alert('Gagal mengunduh data siswa')
    } finally {
      setDownloadingId(null)
    }
  }

  const handleNonaktifkan = async (id: number, currentStatus: boolean) => {
    const action = currentStatus ? 'menonaktifkan' : 'mengaktifkan'
    if (window.confirm(`Apakah Anda yakin ingin ${action} murid ini?`)) {
      try {
        await StudentService.update(id, { status_aktif: !currentStatus })
        alert(`Murid berhasil ${currentStatus ? 'dinonaktifkan' : 'diaktifkan'}`)
        fetchData()
      } catch (error) {
        console.error('Error updating status:', error)
        alert('Gagal mengubah status murid')
      }
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus murid ini? Data yang dihapus tidak dapat dikembalikan.')) {
      try {
        await StudentService.delete(id)
        alert('Murid berhasil dihapus')
        fetchData()
      } catch (error) {
        console.error('Error deleting student:', error)
        alert('Gagal menghapus murid')
      }
    }
  }

  const getPhotoUrl = (murid: any) => {
    if (murid.pendaftaran?.berkas_siswa) {
      const foto = murid.pendaftaran.berkas_siswa.find((b: any) => b.jenis_dokumen === 'foto_anak')
      return foto?.url_file
    }
    return null
  }

  // Filter Logic
  const filteredMurid = muridList.filter(murid => {
    const term = searchTerm.toLowerCase()
    const name = (murid.nama_lengkap || murid.pendaftaran?.nama_siswa || '').toLowerCase()
    const nis = (murid.nis_lokal || '').toLowerCase()
    const kelas = (murid.kelas || '').toLowerCase()

    return name.includes(term) || nis.includes(term) || kelas.includes(term)
  })

  return (
    <AdminLayout activeSection="students">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Kelola Murid</h1>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari berdasarkan Nama, NIS, atau Kelas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
              <p className="text-gray-600">Memuat data murid...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMurid.length > 0 ? (
              filteredMurid.map((murid: any) => {
                const photoUrl = getPhotoUrl(murid)
                const isActive = murid.status_aktif
                // Names fallback
                const displayName = murid.nama_lengkap || murid.pendaftaran?.nama_siswa || 'Nama Tidak Tersedia'

                return (
                  <div key={murid.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                    {/* Photo / Icon Section */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                      <div className={`w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex items-center justify-center ${photoUrl ? 'bg-gray-100' : 'bg-purple-600'}`}>
                        {photoUrl ? (
                          <img src={photoUrl} alt={displayName} className="w-full h-full object-cover" />
                        ) : (
                          <GraduationCap className="w-12 h-12 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-center md:text-left">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-gray-900 truncate">{displayName}</h3>
                        <div className="flex items-center justify-center md:justify-start text-purple-600 font-medium text-sm">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          {murid.kelas || 'Kelas belum ditentukan'}
                        </div>
                        <div className="text-sm text-gray-500">
                          NIS Lokal: <span className="font-medium text-gray-700">{murid.nis_lokal || '-'}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start text-sm text-gray-500 mt-2">
                          <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                          <span className="truncate">{murid.alamat || murid.pendaftaran?.alamat_rumah || 'Alamat belum diisi'}</span>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end justify-between space-y-4">
                        <div className="flex items-center justify-center md:justify-end space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                            {isActive ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </div>

                        <div className="flex items-center justify-center md:justify-end text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1.5" />
                          Terdaftar: {new Date(murid.created_at).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                      <Link
                        to={`/admin/murid/edit/${murid.id}`}
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 w-full md:w-32"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                      {isActive && (
                        <button
                          onClick={() => handleDownload(murid)}
                          disabled={downloadingId === murid.id}
                          className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 w-full md:w-32 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {downloadingId === murid.id ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4 mr-2" />
                          )}
                          Unduh
                        </button>
                      )}

                      <button
                        onClick={() => handleNonaktifkan(murid.id, isActive)}
                        className={`inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white w-full md:w-32 ${isActive ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-500 hover:bg-gray-600'
                          }`}
                      >
                        <PowerOff className="w-4 h-4 mr-2" />
                        {isActive ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>

                      {!isActive && (
                        <button
                          onClick={() => handleDelete(murid.id)}
                          className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-800 hover:bg-red-900 w-full md:w-32"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {searchTerm ? 'Tidak ada hasil pencarian' : 'Belum ada murid'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'Coba kata kunci lain' : 'Tambah murid pertama Anda untuk memulai'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
