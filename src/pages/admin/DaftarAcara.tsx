
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Edit, Trash2, Plus, Loader2 } from 'lucide-react';
import type { Acara } from '../../types';
import { useEvents } from '../../hooks/useEvents';
import AdminLayout from '../../components/AdminLayout';

export default function DaftarAcara() {
  const { events, loading, deleteEvent } = useEvents();

  const formatTanggal = (tanggal: string) => {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleHapus = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus acara ini?')) {
      try {
        await deleteEvent(id);
        alert('Acara berhasil dihapus');
      } catch (error) {
        console.error('Error deleting acara:', error);
        alert('Gagal menghapus acara');
      }
    }
  };

  return (
    <AdminLayout activeSection="events">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Acara</h1>
          <p className="text-gray-600 mt-2">
            Tambah, edit, atau hapus acara yang akan ditampilkan di website.
          </p>
        </div>
        <Link
          to="/admin/acara/tambah"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah Acara
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Memuat data acara...</span>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada acara</h3>
          <p className="text-gray-500 mb-6">Mulai dengan menambahkan acara baru</p>
          <Link
            to="/admin/acara/tambah"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Buat Acara Pertama
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((acara) => (
            <div key={acara.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-100 relative overflow-hidden">
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
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-white" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-blue-800 shadow-sm">
                  {acara.kuota_peserta ? `${acara.kuota_peserta} Peserta` : 'Kuota -'}
                </div>
              </div>

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1" title={acara.judul}>
                  {acara.judul}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{acara.deskripsi_singkat}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    {formatTanggal(acara.tanggal_pelaksanaan)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    {acara.lokasi || 'Lokasi belum diatur'}
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <Link
                    to={`/admin/acara/edit/${acara.id}`}
                    className="flex-1 inline-flex justify-center items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleHapus(acara.id)}
                    className="flex-1 inline-flex justify-center items-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
} 