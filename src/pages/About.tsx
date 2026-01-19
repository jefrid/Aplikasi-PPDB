import React from 'react';
import { BookOpen, Target, Award, Users, GraduationCap, Heart } from 'lucide-react';

export default function TentangKami() {
  return (
    <div className="flex flex-col">
      {/* Bagian Hero */}
      <section className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tentang SPS TPQ AL IKHLAS LEBAKBARANG
            </h1>
            <p className="text-xl opacity-90">
              Memberdayakan pikiran muda dengan nilai-nilai Islam dan keunggulan akademik sejak 2010
            </p>
          </div>
        </div>
      </section>

      {/* Bagian Latar Belakang */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Latar Belakang Kami</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  SPS TPQ AL Ikhlas didirikan pada tahun 2010 dengan visi untuk memberikan pendidikan anak usia dini yang luar biasa berdasarkan prinsip-prinsip Islam. Perjalanan kami dimulai dengan sekelompok kecil pendidik berdedikasi yang berkomitmen untuk membina pikiran muda dalam lingkungan yang merayakan keunggulan akademik dan pertumbuhan spiritual.
                </p>
                <p>
                  Selama bertahun-tahun, kami telah berkembang menjadi institusi pendidikan yang berkembang pesat, melayani ratusan keluarga di komunitas kami sambil mempertahankan komitmen kami terhadap perhatian personal dan pendidikan berkualitas.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">500+</div>
                  <div className="text-sm text-gray-600">Siswa Terdidik</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">14</div>
                  <div className="text-sm text-gray-600">Tahun Keunggulan</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80"
                alt="Siswa belajar"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <Heart className="w-8 h-8 text-red-500" />
                <div className="mt-2 font-semibold">Lingkungan yang Membina</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Visi & Misi */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visi & Misi Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dipandu oleh prinsip-prinsip Islam, kami berusaha menciptakan lingkungan yang membina di mana anak-anak dapat mengembangkan potensi penuh mereka.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Target className="w-10 h-10 text-blue-600 mr-4" />
                <h3 className="text-2xl font-bold">Visi Kami</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Menjadi institusi pendidikan anak usia dini Islam terkemuka yang membina:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Karakter dan nilai-nilai Islam yang kuat</li>
                  <li>Keunggulan akademik dan kreativitas</li>
                  <li>Tanggung jawab sosial dan kepemimpinan</li>
                  <li>Kesadaran global dengan nilai-nilai lokal</li>
                </ul>
              </div>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <BookOpen className="w-10 h-10 text-blue-600 mr-4" />
                <h3 className="text-2xl font-bold">Misi Kami</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Kami mewujudkan visi kami melalui:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Menyediakan pendidikan Islam komprehensif yang terintegrasi dengan metode pengajaran modern</li>
                  <li>Menciptakan lingkungan belajar yang aman dan membina</li>
                  <li>Mempekerjakan staf pengajar yang berkualifikasi dan berdedikasi</li>
                  <li>Melibatkan orang tua dan komunitas dalam proses pendidikan</li>
                  <li>Terus meningkatkan program pendidikan kami</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nilai-nilai Inti */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <KartuNilai
              icon={<Award className="w-12 h-12 text-blue-500" />}
              title="Keunggulan"
              description="Berusaha mencapai standar tertinggi dalam pendidikan dan pengembangan karakter"
            />
            <KartuNilai
              icon={<Heart className="w-12 h-12 text-blue-500" />}
              title="Kepedulian"
              description="Menumbuhkan empati, kebaikan, dan pemahaman dalam komunitas kami"
            />
            <KartuNilai
              icon={<Users className="w-12 h-12 text-blue-500" />}
              title="Komunitas"
              description="Membangun hubungan yang kuat antara siswa, orang tua, dan guru"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

const KartuNilai = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="text-center p-6 rounded-lg bg-white shadow-md">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);