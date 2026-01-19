import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TeacherService } from '../../services/TeacherService';
import { TeacherFormData } from '../../types/teacher';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

export default function TambahPengajar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<TeacherFormData>({
    nip: '',
    nama: '',
    jabatan: '',
    bidang: '',
    email: '',
    telepon: '',
    foto: null
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      loadTeacher(id);
    }
  }, [id, isEditing]);

  const loadTeacher = async (teacherId: string) => {
    setIsLoading(true);
    try {
      const data = await TeacherService.getById(teacherId);
      setFormData({
        nip: data.nip,
        nama: data.nama,
        jabatan: data.jabatan,
        bidang: data.bidang,
        email: data.email,
        telepon: data.telepon,
        foto: null
      });
      if (data.foto_url) {
        setPreviewUrl(data.foto_url);
      }
    } catch (err: any) {
      setError(err.message || 'Gagal memuat data pengajar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Khusus NIP hanya menerima angka
    if (name === 'nip') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, foto: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isEditing && id) {
        await TeacherService.update(id, formData);
      } else {
        await TeacherService.create(formData);
      }
      navigate('/admin/pengajar');
    } catch (err: any) {
      console.error('Submit error:', err);
      setError(err.message || 'Gagal menyimpan data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout activeSection="teachers">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/admin/pengajar')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali ke Daftar
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            {isEditing ? 'Edit Data Pengajar' : 'Tambah Pengajar Baru'}
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Data Identitas (NIP First as requested) */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Informasi Identitas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIP (Nomor Induk Pegawai)
                  </label>
                  <input
                    type="text"
                    name="nip"
                    value={formData.nip}
                    onChange={handleChange}
                    placeholder="Contoh: 1985xxxx..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Nama lengkap beserta gelar"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Data Akademik */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Informasi Akademik & Jabatan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jabatan
                  </label>
                  <input
                    type="text"
                    name="jabatan"
                    value={formData.jabatan}
                    onChange={handleChange}
                    placeholder="Cth: Kepala Sekolah, Guru Kelas"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bidang Studi / Keahlian
                  </label>
                  <input
                    type="text"
                    name="bidang"
                    value={formData.bidang}
                    onChange={handleChange}
                    placeholder="Cth: Tahfidz, Bahasa Arab"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Kontak & Foto */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Kontak & Foto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon / WA
                  </label>
                  <input
                    type="tel"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto Profil
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-green-500 transition-colors bg-gray-50">
                    <div className="space-y-1 text-center">
                      {previewUrl ? (
                        <div className="mb-4">
                          <img src={previewUrl} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-full shadow-md" />
                          <p className="text-xs text-gray-500 mt-2">Klik untuk ganti foto</p>
                        </div>
                      ) : (
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="foto-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                        >
                          <span>Upload file</span>
                          <input id="foto-upload" name="foto" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                        </label>
                        <p className="pl-1">atau drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex justify-end pt-6 border-t space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/pengajar')}
                className="px-6 py-2.5 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-md hover:shadow-lg transition-all flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Menyimpan...'
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? 'Simpan Perubahan' : 'Simpan Data'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}