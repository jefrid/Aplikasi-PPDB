import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    CheckCircle,
    X,
    Calendar,
    MapPin,
    User,
    FileText,
    Loader2,
    AlertCircle
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { RegistrationService } from '../../services/RegistrationService'
import type { PendaftaranWithRelations } from '../../types'

export default function DetailVerifikasi() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [pendaftaran, setPendaftaran] = useState<PendaftaranWithRelations | null>(null)
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (id) {
            fetchPendaftaran()
        }
    }, [id])

    const fetchPendaftaran = async () => {
        try {
            setLoading(true)
            const data = await RegistrationService.getAllForAdmin()
            const found = data.find(p => p.id === Number(id))

            if (found) {
                setPendaftaran(found)
            } else {
                setError('Data pendaftaran tidak ditemukan')
            }
        } catch (err) {
            console.error('Error fetching data:', err)
            setError('Gagal memuat detail pendaftaran')
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async () => {
        if (!id || !window.confirm('Apakah Anda yakin ingin menyetujui pendaftaran ini?')) return

        try {
            setProcessing(true)
            await RegistrationService.updateStatus(Number(id), 'diterima')
            alert('Pendaftaran berhasil disetujui')
            navigate('/admin', { state: { section: 'verification' } })
        } catch (err) {
            console.error('Error approving:', err)
            alert('Gagal menyetujui pendaftaran')
        } finally {
            setProcessing(false)
        }
    }

    const handleReject = async () => {
        if (!id) return
        const catatan = prompt('Masukkan alasan penolakan:')
        if (catatan === null) return // Cancelled

        try {
            setProcessing(true)
            await RegistrationService.updateStatus(Number(id), 'ditolak', catatan)
            alert('Pendaftaran berhasil ditolak')
            navigate('/admin', { state: { section: 'verification' } })
        } catch (err) {
            console.error('Error rejecting:', err)
            alert('Gagal menolak pendaftaran')
        } finally {
            setProcessing(false)
        }
    }

    if (loading) {
        return (
            <AdminLayout activeSection="verification">
                <div className="flex items-center justify-center min-h-[50vh]">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            </AdminLayout>
        )
    }

    if (error || !pendaftaran) {
        return (
            <AdminLayout activeSection="verification">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-red-900 mb-2">Terjadi Kesalahan</h3>
                    <p className="text-red-700 mb-6">{error || 'Data tidak ditemukan'}</p>
                    <button
                        onClick={() => navigate('/admin')}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Kembali ke Dashboard
                    </button>
                </div>
            </AdminLayout>
        )
    }

    const getFileUrl = (jenis: string) => {
        return pendaftaran.berkas_siswa?.find(b => b.jenis_dokumen === jenis)?.url_file
    }

    return (
        <AdminLayout activeSection="verification">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate('/admin', { state: { section: 'verification' } })}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Kembali
                    </button>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleReject}
                            disabled={processing}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50 flex items-center"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Tolak
                        </button>
                        <button
                            onClick={handleApprove}
                            disabled={processing}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center shadow-sm"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Verifikasi
                        </button>
                    </div>
                </div>

                {/* Main Info Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Photo */}
                            <div className="flex-shrink-0">
                                <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                    {getFileUrl('foto_anak') ? (
                                        <img
                                            src={getFileUrl('foto_anak')}
                                            alt={pendaftaran.nama_siswa}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            <User className="w-12 h-12" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 space-y-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{pendaftaran.nama_siswa}</h1>
                                    <div className="flex items-center text-gray-500 mt-2">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>Lahir: {pendaftaran.tempat_lahir}, {pendaftaran.tanggal_lahir ? new Date(pendaftaran.tanggal_lahir).toLocaleDateString('id-ID') : '-'}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500 mt-1">
                                        <User className="w-4 h-4 mr-2" />
                                        <span>Jenis Kelamin: {pendaftaran.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500 mt-1">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>{pendaftaran.alamat_rumah}</span>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 text-yellow-800 px-4 py-3 rounded-lg text-sm inline-block">
                                    <strong>Status Saat Ini:</strong> {pendaftaran.status === 'menunggu_verifikasi' ? 'Menunggu Verifikasi' : pendaftaran.status}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documents Section */}
                <h2 className="text-xl font-bold text-gray-900 pt-4">Berkas Dokumen</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Kartu Keluarga */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900 flex items-center">
                                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                                Kartu Keluarga (KK)
                            </h3>
                            {getFileUrl('kk') && (
                                <a
                                    href={getFileUrl('kk')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Buka di tab baru
                                </a>
                            )}
                        </div>
                        <div className="p-4 bg-gray-100 min-h-[300px] flex items-center justify-center">
                            {getFileUrl('kk') ? (
                                <img src={getFileUrl('kk')} alt="Kartu Keluarga" className="max-w-full max-h-[500px] object-contain" />
                            ) : (
                                <p className="text-gray-500 italic">Berkas belum diupload</p>
                            )}
                        </div>
                    </div>

                    {/* Akta Kelahiran */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900 flex items-center">
                                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                                Akte Kelahiran
                            </h3>
                            {getFileUrl('akte') && (
                                <a
                                    href={getFileUrl('akte')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Buka di tab baru
                                </a>
                            )}
                        </div>
                        <div className="p-4 bg-gray-100 min-h-[300px] flex items-center justify-center">
                            {getFileUrl('akte') ? (
                                <img src={getFileUrl('akte')} alt="Akte Kelahiran" className="max-w-full max-h-[500px] object-contain" />
                            ) : (
                                <p className="text-gray-500 italic">Berkas belum diupload</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    )
}
