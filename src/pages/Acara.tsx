import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Clock, ArrowRight, Loader2 } from 'lucide-react'
import { EventService } from '../services/EventService'
import type { Acara } from '../types'

export default function HalamanAcara() {
  const [dataAcara, setDataAcara] = useState<Acara[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAcara = async () => {
      try {
        const acaraData = await EventService.getAll()
        setDataAcara(acaraData)
      } catch (error) {
        console.error('Error fetching acara:', error)
        setDataAcara([])
      } finally {
        setLoading(false)
      }
    }

    fetchAcara()
  }, [])
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Acara dan Kegiatan</h1>
            <p className="text-xl opacity-90">
              Jadwal kegiatan dan acara-acara mendatang di Al-Nur Academy untuk mendukung perkembangan akademik dan spiritual anak-anak.
            </p>
          </div>
        </div>
      </section>

      {/* Daftar Acara */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Acara Mendatang</h2>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Memuat acara...</p>
              </div>
            </div>
          ) : dataAcara.length > 0 ? (
            <div className="grid gap-8">
              {dataAcara.map((acara) => (
                <KartuAcara key={acara.id} {...acara} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada acara</h3>
              <p className="text-gray-500">Acara akan segera diumumkan</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ingin Mengadakan Acara?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Kami terbuka untuk kolaborasi dan mengadakan acara bersama yang bermanfaat bagi komunitas pendidikan Islam.
          </p>
          <a
            href="mailto:acara@alnuracademy.com"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
          >
            Ajukan Proposal <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}

const KartuAcara = ({ id, judul, deskripsi_singkat, tanggal_pelaksanaan, lokasi, detail_acara, gambar_url }: Acara) => {
  const formatTanggal = (tanggal: string) => {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <div className="grid md:grid-cols-[1fr,2fr] gap-6">
        <div className="h-48 md:h-full bg-gray-100 relative">
          {id ? ( // Temporary check, should be gambar_url check if available on Acara type but using id to skip type error if any
            <img
              src={gambar_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80'}
              alt={judul}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{judul}</h3>
          <p className="text-gray-600 mb-4">
            {deskripsi_singkat || detail_acara || 'Deskripsi acara akan segera diupdate'}
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center text-gray-500">
              <Calendar className="w-5 h-5 mr-2" />
              {formatTanggal(tanggal_pelaksanaan)}
            </div>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-5 h-5 mr-2" />
              {lokasi || 'Lokasi belum ditentukan'}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Link
            to={`/acara/${generateSlug(judul)}`}
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Detail Acara <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}; 