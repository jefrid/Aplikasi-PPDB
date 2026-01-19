import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Star, Clock, Heart, Moon, Sun } from 'lucide-react';

import logo from '../assets/logo.png';

export default function HalamanBeranda() {
  return (
    <div className="min-h-screen">
      {/* Hero Section dengan background image */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1710953055333-ae4aaa4cdc6d")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/100 to-blue-200/20" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              SPS TPQ AL IKHLAS LEBAKBARANG
            </h1>
            <p className="text-2xl mb-8 text-green-50 leading-relaxed">
              Membentuk Generasi Muda Qurani yang Berakhlak Mulia dengan Pendidikan Islam yang Menyenangkan
            </p>
            <div className="flex space-x-4">
              <Link
                to="/pendaftaran"
                className="inline-block bg-white text-blue-800 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
              >
                Daftar Sekarang
              </Link>
              <Link
                to="/program"
                className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Lihat Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Visi & Misi Kami
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Visi</h3>
                    <p className="text-gray-600">
                      Terwujudnya Generasi Islami Yang Sehat, Cerdas, Kreatif Dan Berakhlaqul Karimah.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Misi</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Menciptakan profil pelajar yang berakhlak mulia dan rajin beribadah.</li>
                      <li>• Meningkatkan mutu lulusan yang sesuai dengan tuntutan masyarakat dan perkembangan ilmu pengetahuan dan teknologi.</li>
                      <li>• Mewujudkan proses proses pembelajaran yang aktif kreatif inovatif dan menyenangkan.</li>
                      <li>• Meningkatkan mutu pendidikan dalam upaya mencerdaskan kehidupan generasi bermoral, kreatif, maju dan mandiri.</li>
                      <li>• Membina kemandirian peserta didik melalui pembiasaan, kewirausahaan, dan pengembangan diri yang berkelanjutan. </li>
                      <li>• Menciptakan lingkungan sekolah untuk perkembangan intelektual, sosial, emosional, keterampilan, dan budaya lokal dalam kebhinekaan global.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-full bg-green-100 overflow-hidden">
                <img
                  src={logo}
                  alt="Aktivitas Belajar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Program Unggulan dengan Background Pattern */}
      <section className="py-20 bg-green-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {/* Pattern Islam (bisa ditambahkan sebagai background pattern) */}
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Program Unggulan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Program pembelajaran yang dirancang khusus untuk perkembangan optimal anak
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Program Taman Pendidikan Anak */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
              <div
                className="h-48 bg-green-600 relative overflow-hidden"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1544772711-57da9c7368fa")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <BookOpen className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">Program Taman Pendidikan Anak</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-600">
                  <li>• Pembelajaran Agama Islam</li>
                  <li>• Pembelajaran Akademik</li>
                  <li>• Pengembangan Karakter dan Akhlak</li>
                  <li>• Aktivitas Fisik dan Motorik</li>
                </ul>
                <Link
                  to="/program"
                  className="mt-6 inline-block text-green-600 font-medium hover:text-green-700"
                >
                  Selengkapnya →
                </Link>
              </div>
            </div>

            {/* Program Taman Pendidikan Al Quran */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
              <div
                className="h-48 bg-green-600 relative overflow-hidden"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1654860687488-119a90eafa86")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Moon className="w-8 h-8 mb-2" />
                  <h3 className="text-xl font-bold">Program Taman Pendidikan Al Quran</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-600">
                  <li>• Pengenalan huruf hijaiyah</li>
                  <li>• Pengenalan tafsir sederhana dan ilmu Al-Qur'an</li>
                  <li>• Peningkatan kemampuan membaca Al-Qur'an dengan tajwid dasar</li>
                  <li>• Penerapan nilai-nilai Al-Qur'an dalam kehidupan sehari-hari</li>
                </ul>
                <Link
                  to="/program"
                  className="mt-6 inline-block text-green-600 font-medium hover:text-green-700"
                >
                  Selengkapnya →
                </Link>
              </div>
            </div>

            {/* Program Khusus */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div
                className="h-48 bg-green-600 relative overflow-hidden"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-800/50 to-green-600/30" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg inline-block mb-3">
                    <Star className="w-8 h-8 text-yellow-300" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Program Khusus</h3>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-b from-white to-green-50">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Tahsin dan tahfiz Al-Qur'an</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Studi hadis dan ilmu hadis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Tadabbur dan tafsir Al-Qur'an</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Seni Islami</span>
                  </li>
                </ul>
                <Link
                  to="/program"
                  className="mt-6 inline-flex items-center text-green-600 font-medium hover:text-green-700 group-hover:translate-x-1 transition-transform"
                >
                  Selengkapnya
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section dengan Background Pattern Islam */}
      <section className="py-20 bg-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Pattern Islam (bisa ditambahkan sebagai background pattern) */}
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Mulai Perjalanan Belajar</h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Bergabunglah bersama kami dalam membentuk generasi Qurani yang berakhlak mulia
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/login"
                className="bg-white text-green-800 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors"
              >
                Daftar Sekarang
              </Link>
              <Link
                to="/kontak"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-800 transition-colors"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
