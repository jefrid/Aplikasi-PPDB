import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function HalamanKontak() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-green-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
            <p className="text-xl opacity-90">
              Kami siap membantu menjawab pertanyaan Anda seputar pendidikan anak di SPS TPQ AL IKHLAS LEBAKBARANG.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form Kontak */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subjek" className="block text-sm font-medium text-gray-700 mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subjek"
                    name="subjek"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="pesan"
                    name="pesan"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium"
                >
                  Kirim Pesan <Send className="ml-2 w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Informasi Kontak */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Alamat</h3>
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <p className="text-gray-600">
                        SPS TPQ AL IKHLAS LEBAKBARANG<br />
                        Desa Lebakbarang<br />
                        Kecamatan Pekuncen<br />
                        Kabupaten Banyumas
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Kontak Langsung</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Phone className="w-6 h-6 text-green-600" />
                      <a href="tel:+6281234567890" className="text-gray-600 hover:text-green-600">
                        +62 812-3456-7890
                      </a>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Mail className="w-6 h-6 text-green-600" />
                      <a href="mailto:spstpqalikhlas@gmail.com" className="text-gray-600 hover:text-green-600">
                        spstpqalikhlas@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Jam Operasional</h3>
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-green-600 mt-1" />
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Senin - Jumat:</span><br />
                        08:00 - 16:00 WIB
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Sabtu:</span><br />
                        08:00 - 12:00 WIB
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Minggu:</span><br />
                        Tutup
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Peta Lokasi */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Lokasi Kami</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1163.7887575164127!2d109.6567174744553!3d-7.132374631130099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e701c875f013c61%3A0x5ceea1a8e10b7197!2sMasjid%20Al-Ikhlas%20Lebakbarang!5e0!3m2!1sen!2sid!4v1742453458393!5m2!1sen!2sid" 
              className="w-full h-[500px] rounded-xl"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
} 