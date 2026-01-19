import React, { useState, useEffect } from 'react'
import { Search, Users, Award, BookOpen, Loader2, Phone, Mail } from 'lucide-react'
import { TeacherService } from '../services/TeacherService'
import type { Teacher } from '../types/teacher'

export default function HalamanPengajar() {
  const [dataPengajar, setDataPengajar] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('semua')

  useEffect(() => {
    const fetchPengajar = async () => {
      try {
        const pengajarData = await TeacherService.getAll()
        setDataPengajar(pengajarData)
      } catch (error) {
        console.error('Error fetching pengajar:', error)
        setDataPengajar([])
      } finally {
        setLoading(false)
      }
    }

    fetchPengajar()
  }, [])

  // Filter pengajar berdasarkan search term dan filter
  const filteredPengajar = dataPengajar.filter(pengajar => {
    const matchesSearch = pengajar.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pengajar.jabatan && pengajar.jabatan.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pengajar.bidang && pengajar.bidang.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = selectedFilter === 'semua' ||
      (pengajar.jabatan && pengajar.jabatan.toLowerCase().includes(selectedFilter.toLowerCase())) ||
      (pengajar.bidang && pengajar.bidang.toLowerCase().includes(selectedFilter.toLowerCase()));

    return matchesSearch && matchesFilter;
  })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tim Pengajar</h1>
            <p className="text-xl opacity-90">
              Dipimpin oleh para pendidik berkualifikasi yang berkomitmen untuk membentuk generasi Muslim yang berilmu dan berakhlak mulia.
            </p>
          </div>
        </div>
      </section>

      {/* Pencarian dan Filter */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari pengajar..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="semua">Semua Bidang</option>
              <option value="kepala sekolah">Kepala Sekolah</option>
              <option value="guru">Guru</option>
              <option value="tahfidz">Tahfidz</option>
            </select>
          </div>

          {/* Daftar Pengajar */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600 animate-spin" />
                <p className="text-gray-600">Memuat data pengajar...</p>
              </div>
            </div>
          ) : filteredPengajar.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPengajar.map((pengajar) => (
                <KartuPengajar key={pengajar.id} {...pengajar} />
              ))}
            </div>
          ) : searchTerm ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada pengajar yang sesuai dengan pencarian Anda.</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada pengajar</h3>
              <p className="text-gray-500">Data pengajar akan segera ditambahkan</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Bergabung dengan Tim Kami</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Kami selalu mencari pendidik berkualitas yang berkomitmen untuk memberikan pendidikan Islam terbaik.
          </p>
          <a
            href="mailto:karir@alnuracademy.com"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
          >
            Kirim Lamaran
          </a>
        </div>
      </section>
    </div>
  );
}

function KartuPengajar({ nama, jabatan, bidang, email, telepon, foto_url }: Teacher) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full">
      <div className="h-64 overflow-hidden relative bg-gray-100">
        {foto_url ? (
          <img
            src={foto_url}
            alt={nama}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <Users className="w-20 h-20 text-white opacity-50" />
          </div>
        )}
        <div className="absolute top-0 right-0 m-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-800 shadow-sm">
            {jabatan}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{nama}</h3>
        <p className="text-blue-600 font-medium mb-4 text-sm uppercase tracking-wide">
          {bidang || 'Bidang belum ditentukan'}
        </p>

        <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
          {email && (
            <div className="flex items-center text-gray-600 text-sm">
              <Mail className="w-4 h-4 mr-3 text-gray-400" />
              <span className="truncate">{email}</span>
            </div>
          )}
          {telepon && (
            <div className="flex items-center text-gray-600 text-sm">
              <Phone className="w-4 h-4 mr-3 text-gray-400" />
              <span>{telepon}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 