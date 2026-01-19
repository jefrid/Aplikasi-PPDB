
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { RegistrationService, DocumentService } from '../services/RegistrationService'
import type { PendaftaranFormData } from '../types'
import ParentLayout from '../components/ParentLayout'
import {
  ArrowLeft,
  AlertCircle,
  Upload,
  FileText,
  Loader2
} from 'lucide-react'

export default function EditPendaftaran() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<PendaftaranFormData>({
    id_wali: '',
    nama_siswa: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: 'L',
    alamat_rumah: '',
    status: 'menunggu_verifikasi',
    created_at: '',
    updated_at: ''
  })

  // State untuk file yang sudah ada di server
  const [existingFiles, setExistingFiles] = useState<{ [key: string]: string | null }>({
    kk: null,
    akte: null,
    foto_anak: null
  })

  // State untuk file baru yang akan diupload
  const [newFiles, setNewFiles] = useState<{ [key: string]: File | null }>({
    kk: null,
    akte: null,
    foto_anak: null
  })

  useEffect(() => {
    if (id && user) {
      fetchPendaftaran()
    }
  }, [id, user])

  const fetchPendaftaran = async () => {
    try {
      setLoading(true)
      const data = await RegistrationService.getByUserId(user!.id)
      const pendaftaran = data.find(p => p.id === Number(id))

      if (!pendaftaran) {
        setError('Data pendaftaran tidak ditemukan')
        return
      }

      setFormData({
        id_wali: pendaftaran.id_wali,
        nama_siswa: pendaftaran.nama_siswa || '',
        tempat_lahir: pendaftaran.tempat_lahir || '',
        tanggal_lahir: pendaftaran.tanggal_lahir || '',
        jenis_kelamin: pendaftaran.jenis_kelamin || 'L',
        alamat_rumah: pendaftaran.alamat_rumah || '',
        status: pendaftaran.status,
        created_at: pendaftaran.created_at,
        updated_at: pendaftaran.updated_at,
        catatan_admin: pendaftaran.catatan_admin || undefined
      })

      // Map existing files
      if (pendaftaran.berkas_siswa) {
        const files: { [key: string]: string | null } = {
          kk: null,
          akte: null,
          foto_anak: null
        }
        pendaftaran.berkas_siswa.forEach(berkas => {
          if (['kk', 'akte', 'foto_anak'].includes(berkas.jenis_dokumen)) {
            files[berkas.jenis_dokumen] = berkas.url_file
          }
        })
        setExistingFiles(files)
      }

    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
      if (!validTypes.includes(file.type)) {
        alert('File tidak sesuai. Harap upload file PNG atau JPG.')
        e.target.value = ''
        return
      }

      setNewFiles(prev => ({
        ...prev,
        [key]: file
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !user) return

    try {
      setSaving(true)
      setError(null)

      // 1. Update text data and reset status if rejected
      await RegistrationService.update(Number(id), {
        nama_siswa: formData.nama_siswa,
        tempat_lahir: formData.tempat_lahir,
        tanggal_lahir: formData.tanggal_lahir,
        jenis_kelamin: formData.jenis_kelamin,
        alamat_rumah: formData.alamat_rumah,
        status: 'menunggu_verifikasi', // Reset status for re-verification
        catatan_admin: null // Clear previous rejection notes
      })

      // 2. Upload new files if any
      const uploadPromises = Object.entries(newFiles)
        .filter(([_, file]) => file !== null)
        .map(([jenis, file]) =>
          DocumentService.uploadFile(file!, Number(id), jenis)
        )

      if (uploadPromises.length > 0) {
        await Promise.all(uploadPromises)
      }

      navigate('/dashboard')
    } catch (err: any) {
      console.error('Error updating:', err)
      const errorMessage = err?.message || 'Terjadi kesalahan saat menyimpan.'
      setError(`Gagal menyimpan perubahan: ${errorMessage}`)
      alert(`Gagal menyimpan perubahan: ${errorMessage}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <ParentLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </ParentLayout>
    )
  }

  return (
    <ParentLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Dashboard
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Edit Data Anak</h1>
            <p className="text-gray-600 mt-2">Perbarui data pendaftaran anak Anda.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center text-red-700">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap Anak</label>
                <input
                  type="text"
                  value={formData.nama_siswa}
                  onChange={(e) => setFormData(prev => ({ ...prev, nama_siswa: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tempat Lahir</label>
                <input
                  type="text"
                  value={formData.tempat_lahir}
                  onChange={(e) => setFormData(prev => ({ ...prev, tempat_lahir: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
                <input
                  type="date"
                  value={formData.tanggal_lahir?.split('T')[0]}
                  onChange={(e) => setFormData(prev => ({ ...prev, tanggal_lahir: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
                <select
                  value={formData.jenis_kelamin}
                  onChange={(e) => setFormData(prev => ({ ...prev, jenis_kelamin: e.target.value as 'L' | 'P' }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Rumah</label>
                <textarea
                  value={formData.alamat_rumah}
                  onChange={(e) => setFormData(prev => ({ ...prev, alamat_rumah: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* File Upload Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Update Berkas (Opsional)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { key: 'kk', label: 'Kartu Keluarga' },
                  { key: 'akte', label: 'Akte Kelahiran' },
                  { key: 'foto_anak', label: 'Pas Foto Anak' }
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">{item.label}</label>

                    {/* Existing file checker */}
                    {existingFiles[item.key] ? (
                      <div className="flex items-center text-sm text-green-600 bg-green-50 p-2 rounded mb-2">
                        <FileText className="w-4 h-4 mr-2" />
                        <span>File sudah ada</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-sm text-orange-600 bg-orange-50 p-2 rounded mb-2">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        <span>Belum ada file</span>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => handleFileChange(item.key, e)}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {newFiles[item.key] && (
                      <p className="text-xs text-blue-600 mt-1">
                        Akan diupload: {newFiles[item.key]?.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ParentLayout>
  )
}
