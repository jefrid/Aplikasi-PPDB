import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface FormData {
  namaLengkap: string;
  tanggalLahir: string;
  jenisKelamin: string;
  namaOrangTua: string;
  alamat: string;
  noWhatsapp: string;
  program: string;
  asalSekolah: string;
}

export default function HalamanPendaftaran() {
  const [formData, setFormData] = useState<FormData>({
    namaLengkap: '',
    tanggalLahir: '',
    jenisKelamin: '',
    namaOrangTua: '',
    alamat: '',
    noWhatsapp: '',
    program: '',
    asalSekolah: ''
  });

  const programList = [
    'TK Islam Al-Nur',
    'SD Islam Al-Nur',
    'SMP Islam Al-Nur',
    'Program Tahfidz',
    'Program Bahasa Arab'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format pesan WhatsApp
    const message = `*PENDAFTARAN AL-NUR ACADEMY*
    
Nama Lengkap: ${formData.namaLengkap}
Tanggal Lahir: ${formData.tanggalLahir}
Jenis Kelamin: ${formData.jenisKelamin}
Nama Orang Tua: ${formData.namaOrangTua}
Alamat: ${formData.alamat}
No. WhatsApp: ${formData.noWhatsapp}
Program: ${formData.program}
Asal Sekolah: ${formData.asalSekolah}`;

    // Nomor WhatsApp sekolah (ganti dengan nomor yang sebenarnya)
    const phoneNumber = '6281234567890';
    
    // Buat URL WhatsApp dengan pesan yang sudah diformat
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Buka WhatsApp di tab baru
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80")',
        }}>
        <div className="absolute inset-0 bg-blue-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pendaftaran</h1>
            <p className="text-xl opacity-90">
              Bergabunglah dengan Sps Tpq AL ikhlas untuk pendidikan Islam berkualitas
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Formulir Pendaftaran
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.namaLengkap}
                    onChange={(e) => setFormData({...formData, namaLengkap: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.tanggalLahir}
                    onChange={(e) => setFormData({...formData, tanggalLahir: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.jenisKelamin}
                    onChange={(e) => setFormData({...formData, jenisKelamin: e.target.value})}
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Orang Tua
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.namaOrangTua}
                    onChange={(e) => setFormData({...formData, namaOrangTua: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.alamat}
                    onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No. WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.noWhatsapp}
                    onChange={(e) => setFormData({...formData, noWhatsapp: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program yang Dipilih
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.program}
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                  >
                    <option value="">Pilih Program</option>
                    {programList.map((program) => (
                      <option key={program} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asal Sekolah
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.asalSekolah}
                    onChange={(e) => setFormData({...formData, asalSekolah: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Check className="w-5 h-5 text-green-500" />
                <p>Data Anda akan kami jaga kerahasiaannya</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Kirim Pendaftaran via WhatsApp
              </button>
            </form>
          </div>

          {/* Informasi Tambahan */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Informasi Penting
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Pastikan semua data yang diisi sudah benar</li>
              <li>• Anda akan diarahkan ke WhatsApp untuk mengirim data pendaftaran</li>
              <li>• Tim kami akan menghubungi Anda dalam 1x24 jam</li>
              <li>• Siapkan dokumen pendukung yang diperlukan</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 