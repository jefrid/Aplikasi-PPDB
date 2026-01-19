import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Share2, Download, Users, Mail, Phone, ArrowLeft } from 'lucide-react';
import type { Acara } from '../types';

// Data contoh acara (dalam implementasi nyata akan mengambil dari API/database)
const dataAcara: Record<string, Acara & { gambar: string; detailAcara: string; peserta: number; biaya: string }> = {
  'open-house-al-nur-academy-2024': {
    id: '1',
    judul: 'Open House Al-Nur Academy 2024',
    deskripsi: 'Kesempatan bagi orang tua untuk mengunjungi sekolah, bertemu dengan guru-guru, dan melihat langsung fasilitas pembelajaran kami.',
    tanggal: '2024-04-15',
    lokasi: 'Kampus Al-Nur Academy',
    gambar: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80',
    detailAcara: `
      Open House Al-Nur Academy 2024 adalah kesempatan istimewa bagi para orang tua dan calon siswa untuk mengenal lebih dekat dengan lingkungan pembelajaran kami. Dalam acara ini, Anda akan:

      1. Mengikuti tur keliling kampus untuk melihat fasilitas modern kami
      2. Bertemu langsung dengan para pengajar berpengalaman
      3. Menyaksikan demonstrasi metode pembelajaran yang kami terapkan
      4. Mendapatkan informasi lengkap tentang program akademik
      5. Berkonsultasi tentang pendidikan anak Anda

      Kami juga akan menampilkan berbagai prestasi siswa-siswi kami dalam bidang akademik, seni, dan hafalan Al-Quran. Para pengunjung dapat berinteraksi langsung dengan siswa dan melihat hasil karya mereka yang dipamerkan.

      Acara ini juga akan diisi dengan:
      - Presentasi visi dan misi sekolah
      - Pengenalan kurikulum terintegrasi
      - Sesi tanya jawab dengan kepala sekolah
      - Demonstrasi kegiatan ekstrakurikuler
      - Pameran karya siswa
    `,
    peserta: 100,
    biaya: 'Gratis'
  },
  'festival-anak-sholeh': {
    id: '2',
    judul: 'Festival Anak Sholeh',
    deskripsi: 'Lomba-lomba Islami untuk anak-anak, termasuk hafalan Quran, adzan, dan praktek ibadah.',
    tanggal: '2024-05-20',
    lokasi: 'Aula Utama',
    gambar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80',
    detailAcara: `
      Festival Anak Sholeh adalah ajang kompetisi yang memadukan nilai-nilai Islam dengan semangat berkompetisi. Kegiatan ini bertujuan untuk:

      1. Meningkatkan semangat belajar Al-Quran
      2. Mengembangkan kepercayaan diri anak
      3. Mempererat ukhuwah Islamiyah
      4. Mengasah bakat dan kemampuan

      Kategori Lomba:
      - Hafalan Al-Quran (Juz 30)
      - Praktek Sholat
      - Adzan dan Iqomah
      - Doa Sehari-hari
      - Kaligrafi Islam

      Setiap peserta akan mendapatkan:
      - Sertifikat partisipasi
      - Goodie bag
      - Kesempatan memenangkan hadiah menarik
      - Pengalaman berharga
    `,
    peserta: 150,
    biaya: 'Rp 50.000/kategori'
  }
};

export default function DetailAcara() {
  const { slug } = useParams<{ slug: string }>();
  const acara = slug ? dataAcara[slug] : null;

  if (!acara) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acara Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Maaf, acara yang Anda cari tidak tersedia.</p>
          <Link
            to="/acara"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Daftar Acara
          </Link>
        </div>
      </div>
    );
  }

  const formatTanggal = (tanggal: string) => {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Image */}
      <div className="relative h-[500px]">
        <img
          src={acara.gambar}
          alt={acara.judul}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/acara"
              className="inline-flex items-center text-white hover:text-blue-200 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali ke Daftar Acara
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{acara.judul}</h1>
            <p className="text-xl text-white/90 max-w-3xl">{acara.deskripsi}</p>
          </div>
        </div>
      </div>

      {/* Informasi Utama */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Tanggal</p>
                <p className="font-medium">{formatTanggal(acara.tanggal)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Lokasi</p>
                <p className="font-medium">{acara.lokasi}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Kuota Peserta</p>
                <p className="font-medium">{acara.peserta} orang</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[2fr,1fr] gap-12">
          {/* Detail Acara */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detail Acara</h2>
            <div className="prose prose-blue max-w-none">
              {acara.detailAcara.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Informasi Biaya */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Informasi Biaya</h3>
              <p className="text-3xl font-bold text-blue-600">{acara.biaya}</p>
            </div>

            {/* Tombol Aksi */}
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">
                <Download className="w-5 h-5 mr-2" />
                Unduh Brosur
              </button>
              <button className="w-full flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium">
                <Share2 className="w-5 h-5 mr-2" />
                Bagikan
              </button>
            </div>

            {/* Kontak Panitia */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Kontak Panitia</h3>
              <div className="space-y-3">
                <a
                  href="https://wa.me/6281234567890"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  +62 812-3456-7890 (Ustadz Ahmad)
                </a>
                <a
                  href="mailto:acara@alnuracademy.com"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  acara@alnuracademy.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 