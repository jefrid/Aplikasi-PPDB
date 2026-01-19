import React from 'react'
import { Link } from 'react-router-dom'
import {
    Calendar,
    MapPin,
    Users,
    Eye,
    CheckCircle,
    Clock,
    Loader2
} from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { useRegistration } from '../../hooks/useRegistration'

export default function VerifikasiMurid() {
    const { registrations, loading } = useRegistration()

    return (
        <AdminLayout activeSection="verification">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Verifikasi Pendaftaran Murid</h1>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center min-h-96">
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
                            <p className="text-gray-600">Memuat data...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {registrations.filter(r => r.status === 'menunggu_verifikasi').length > 0 ? (
                            registrations.filter(r => r.status === 'menunggu_verifikasi').map((pendaftaran) => (
                                <div
                                    key={pendaftaran.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-yellow-400"
                                >
                                    <div className="grid md:grid-cols-[120px,1fr,auto] gap-6">
                                        {/* Status */}
                                        <div className="h-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center relative overflow-hidden group">
                                            {pendaftaran.berkas_siswa?.find(b => b.jenis_dokumen === 'foto_anak')?.url_file ? (
                                                <img
                                                    src={pendaftaran.berkas_siswa.find(b => b.jenis_dokumen === 'foto_anak')?.url_file}
                                                    alt={pendaftaran.nama_siswa}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Clock className="w-12 h-12 text-white" />
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
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                        Menunggu Verifikasi
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

                                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                                <p className="text-sm text-blue-700">
                                                    <strong>Info:</strong> Klik tombol Detail untuk melihat berkas dan memverifikasi.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Aksi */}
                                        <div className="p-6 md:p-8 flex md:flex-col justify-end space-x-4 md:space-x-0 md:space-y-4">
                                            <Link
                                                to={`/admin/verifikasi/${pendaftaran.id}`}
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors justify-center"
                                            >
                                                <Eye className="w-4 h-4 mr-2" />
                                                Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Semua pendaftaran sudah diverifikasi</h3>
                                <p className="text-gray-500">Tidak ada pendaftaran yang menunggu verifikasi saat ini.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
