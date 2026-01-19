import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Upload, Save, ArrowLeft } from 'lucide-react';
import { EventService } from '../../services/EventService';

interface FormAcara {
  judul: string;
  tanggal_pelaksanaan: string;
  deskripsi_singkat: string;
  lokasi: string;
  kuota_peserta: number;
  detail_acara: string;
  gambar_file: File | null;
}

const initialForm: FormAcara = {
  judul: '',
  tanggal_pelaksanaan: '',
  deskripsi_singkat: '',
  lokasi: '',
  kuota_peserta: 0,
  detail_acara: '',
  gambar_file: null
};

export default function TambahAcara() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<FormAcara>(initialForm);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchEvent = async () => {
        try {
          setLoading(true);
          const data = await EventService.getById(Number(id));
          if (data) {
            setFormData({
              judul: data.judul,
              tanggal_pelaksanaan: data.tanggal_pelaksanaan.split('T')[0],
              deskripsi_singkat: data.deskripsi_singkat || '',
              lokasi: data.lokasi || '',
              kuota_peserta: data.kuota_peserta || 0,
              detail_acara: data.detail_acara || '',
              gambar_file: null // File cannot be pre-filled
            });
            if (data.gambar_url) {
              setPreview(data.gambar_url);
            }
          }
        } catch (error) {
          console.error('Error fetching event:', error);
          alert('Gagal memuat data acara');
          navigate('/admin/acara');
        } finally {
          setLoading(false);
        }
      };
      fetchEvent();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFormData(prev => ({
          ...prev,
          gambar_file: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let gambarUrl = preview; // Default to existing URL if in edit mode and no new file

      // Upload gambar jika ada file baru selected
      if (formData.gambar_file) {
        console.log('Uploading event image...');
        gambarUrl = await EventService.uploadEventImage(formData.gambar_file);
        console.log('Image uploaded successfully:', gambarUrl);
      }

      // Siapkan data untuk database
      const acaraData = {
        judul: formData.judul,
        tanggal_pelaksanaan: formData.tanggal_pelaksanaan,
        deskripsi_singkat: formData.deskripsi_singkat,
        lokasi: formData.lokasi,
        kuota_peserta: formData.kuota_peserta,
        detail_acara: formData.detail_acara,
        gambar_url: gambarUrl
      };

      if (isEditMode) {
        console.log('Updating event:', acaraData);
        await EventService.update(Number(id), acaraData);
        alert('Acara berhasil diperbarui!');
      } else {
        console.log('Saving event:', acaraData);
        await EventService.create(acaraData);
        alert('Acara berhasil ditambahkan!');
      }

      navigate('/admin/acara');
    } catch (error) {
      console.error('Error:', error);
      alert(`Terjadi kesalahan saat menyimpan acara: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Memuat data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{isEditMode ? 'Edit Acara' : 'Tambah Acara Baru'}</h1>
              <p className="text-gray-600 mt-2">
                {isEditMode ? 'Perbarui informasi acara di bawah ini.' : 'Isi formulir di bawah ini untuk menambahkan acara baru ke website.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/admin/acara')}
              className="text-gray-500 hover:text-gray-700 p-2"
              title="Kembali"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload Gambar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar Acara
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {preview ? (
                    <div className="relative">
                      <img
                        src={preview}
                        alt="Preview"
                        className="mx-auto h-64 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setFormData(prev => ({ ...prev, gambar_file: null }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="gambar-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Upload gambar</span>
                          <input
                            id="gambar-upload"
                            name="gambar"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF sampai 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Informasi Dasar */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="judul" className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Acara
                </label>
                <input
                  type="text"
                  id="judul"
                  name="judul"
                  value={formData.judul}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="tanggal_pelaksanaan" className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Acara
                </label>
                <input
                  type="date"
                  id="tanggal_pelaksanaan"
                  name="tanggal_pelaksanaan"
                  value={formData.tanggal_pelaksanaan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="deskripsi_singkat" className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Singkat
              </label>
              <textarea
                id="deskripsi_singkat"
                name="deskripsi_singkat"
                value={formData.deskripsi_singkat}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi
                </label>
                <input
                  type="text"
                  id="lokasi"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="kuota_peserta" className="block text-sm font-medium text-gray-700 mb-2">
                  Kuota Peserta
                </label>
                <input
                  type="number"
                  id="kuota_peserta"
                  name="kuota_peserta"
                  value={formData.kuota_peserta}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="detail_acara" className="block text-sm font-medium text-gray-700 mb-2">
                Detail Acara
              </label>
              <textarea
                id="detail_acara"
                name="detail_acara"
                value={formData.detail_acara}
                onChange={handleChange}
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan detail lengkap acara..."
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              {!isEditMode && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData(initialForm);
                    setPreview(null);
                  }}
                  className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Reset
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {isSubmitting ? (
                  'Menyimpan...'
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    {isEditMode ? 'Simpan Perubahan' : 'Simpan Acara'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 