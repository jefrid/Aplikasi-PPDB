import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { RegistrationService, DocumentService } from '../../services/RegistrationService'
import { Upload, AlertCircle, ArrowLeft } from 'lucide-react'
import type { PendaftaranFormData } from '../../types'
import ParentLayout from '../../components/ParentLayout'

export default function StudentRegistration() {
    const [registerForm, setRegisterForm] = useState<PendaftaranFormData>({
        nama_siswa: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: 'L',
        alamat_rumah: ''
    })
    const [berkasFiles, setBerkasFiles] = useState<{ [key: string]: File | null }>({
        kk: null,
        akte: null,
        foto_anak: null
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const { user } = useAuth()

    const handleFileUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null

        if (file) {
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
            if (!validTypes.includes(file.type)) {
                alert('File tidak sesuai. Harap upload file PNG atau JPG.')
                e.target.value = '' // Reset input
                setBerkasFiles(prev => ({
                    ...prev,
                    [key]: null
                }))
                return
            }
        }

        setBerkasFiles(prev => ({
            ...prev,
            [key]: file
        }))
    }

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        try {
            setIsSubmitting(true)
            setError(null)

            const pendaftaranData = {
                ...registerForm,
                id_wali: user.id,
                status: 'menunggu_verifikasi' as const,
                created_at: new Date().toISOString()
            }

            // Create pendaftaran first
            const newPendaftaran = await RegistrationService.create(pendaftaranData)

            // Upload berkas if any
            const berkasPromises = Object.entries(berkasFiles)
                .filter(([_, file]) => file !== null)
                .map(([jenis, file]) =>
                    DocumentService.uploadFile(file!, Number(newPendaftaran.id), jenis)
                )

            if (berkasPromises.length > 0) {
                await Promise.all(berkasPromises)
            }

            // Redirect back to dashboard
            navigate('/dashboard')
        } catch (err: any) {
            console.error('Error registering:', err)
            setError(err.message || 'Gagal mendaftarkan anak. Silakan coba lagi.')
        } finally {
            setIsSubmitting(false)
        }
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
                        <h1 className="text-3xl font-bold text-gray-900">Pendaftaran Anak Baru</h1>
                        <p className="text-gray-600 mt-2">Isi formulir lengkap untuk mendaftarkan anak Anda ke TPQ Al-Ikhlas</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center text-red-700">
                            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleRegisterSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Lengkap Anak *
                                </label>
                                <input
                                    type="text"
                                    value={registerForm.nama_siswa}
                                    onChange={(e) => setRegisterForm(prev => ({ ...prev, nama_siswa: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Masukkan nama lengkap anak"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tempat Lahir *
                                </label>
                                <input
                                    type="text"
                                    value={registerForm.tempat_lahir}
                                    onChange={(e) => setRegisterForm(prev => ({ ...prev, tempat_lahir: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Kota kelahiran"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tanggal Lahir *
                                </label>
                                <input
                                    type="date"
                                    value={registerForm.tanggal_lahir}
                                    onChange={(e) => setRegisterForm(prev => ({ ...prev, tanggal_lahir: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jenis Kelamin *
                                </label>
                                <select
                                    value={registerForm.jenis_kelamin}
                                    onChange={(e) => setRegisterForm(prev => ({ ...prev, jenis_kelamin: e.target.value as 'L' | 'P' }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                >
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Alamat Rumah *
                                </label>
                                <textarea
                                    value={registerForm.alamat_rumah}
                                    onChange={(e) => setRegisterForm(prev => ({ ...prev, alamat_rumah: e.target.value }))}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Alamat lengkap tempat tinggal"
                                    required
                                />
                            </div>
                        </div>

                        {/* Upload Berkas */}
                        <div className="space-y-6 pt-6 border-t border-gray-200">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <Upload className="w-5 h-5 mr-2" />
                                    Upload Berkas
                                </h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    Upload dokumen pendukung. Format yang diterima hanya JPG dan PNG.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Kartu Keluarga */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Kartu Keluarga <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            required
                                            onChange={(e) => handleFileUpload('kk', e)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                    {berkasFiles.kk && <p className="text-xs text-green-600">✓ {berkasFiles.kk.name}</p>}
                                </div>

                                {/* Akte Kelahiran */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Akte Kelahiran <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            required
                                            onChange={(e) => handleFileUpload('akte', e)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                    {berkasFiles.akte && <p className="text-xs text-green-600">✓ {berkasFiles.akte.name}</p>}
                                </div>

                                {/* Foto Anak */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Pas Foto Anak (3x4) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            required
                                            onChange={(e) => handleFileUpload('foto_anak', e)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                    {berkasFiles.foto_anak && <p className="text-xs text-green-600">✓ {berkasFiles.foto_anak.name}</p>}
                                    <p className="text-xs text-gray-500">Format: JPG, PNG only</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
                            >
                                {isSubmitting ? 'Mendaftarkan...' : 'Daftar Anak Sekarang'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ParentLayout>
    )
}
