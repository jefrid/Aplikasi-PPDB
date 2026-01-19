import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SPS TPQ AL IKHLAS LEBAKBARANG</h3>
            <p className="text-green-100">
            Membentuk Generasi Muda Qurani yang Berakhlak Mulia dengan Pendidikan Islam yang Menyenangkan
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Program</h3>
            <ul className="space-y-2 text-green-100">
              <li><Link to="/program/usiadini">Program Usia Dini</Link></li>
              <li><Link to="/program/alquran">Program Pendidikan Al-Quran</Link></li>
              <li><Link to="/program/khusus">Program Khusus</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi</h3>
            <ul className="space-y-2 text-green-100">
              <li><Link to="/tentang-kami">Tentang Kami</Link></li>
              <li><Link to="/pengajar">Tim Pengajar</Link></li>
              <li><Link to="/fasilitas">Fasilitas</Link></li>
              <li><Link to="/kontak">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-green-100">
              <li>Jl. Pendidikan No. 123</li>
              <li>Lebakbarang, Pekalongan</li>
              <li>Tel: (0858) 4825-3569</li>
              <li>Email: spstpqalikhlas@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-100">
          <p>&copy; {new Date().getFullYear()} SPS TPQ AL IKHLAS LEBAKBARANG. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
} 