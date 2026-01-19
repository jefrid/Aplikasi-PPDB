import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Brain, Clock, Globe, GraduationCap, Heart, Languages, Moon, Music, Palette, PlayCircle, Star, Sun, Users, BookOpen } from 'lucide-react';

export default function Program() {
  return (
    <div className="flex flex-col">
      {/* Bagian Hero */}
      <section className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Program Pendidikan Kami</h1>
            <p className="text-xl opacity-90">
              Membina pikiran muda melalui perpaduan sempurna antara nilai-nilai Islam dan keunggulan akademik
            </p>
          </div>
        </div>
      </section>

      {/* Program Inti */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Program Inti</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <KartuProgram
              icon={<BookOpen className="w-12 h-12" />}
              title="Program Taman Pendidikan Anak"
              description="Program pembelajaran terpadu yang menggabungkan pendidikan dasar dengan nilai-nilai Islam untuk anak usia dini."
              features={[
                "Pembelajaran Agama Islam",
                "Pembelajaran Akademik",
                "Pengembangan Karakter dan Akhlak",
                "Aktivitas Fisik dan Motorik"
              ]}
              imageUrl="https://images.unsplash.com/photo-1544772711-57da9c7368fa"
            />
            <KartuProgram
              icon={<Moon className="w-12 h-12" />}
              title="Program Taman Pendidikan Al Quran"
              description="Program khusus untuk pembelajaran Al-Quran dan nilai-nilai Islam dengan metode yang menyenangkan."
              features={[
                "Pengenalan huruf hijaiyah",
                "Pengenalan tafsir sederhana dan ilmu Al-Qur'an",
                "Peningkatan kemampuan membaca Al-Qur'an dengan tajwid dasar",
                "Penerapan nilai-nilai Al-Qur'an dalam kehidupan sehari-hari"
              ]}
              imageUrl="https://images.unsplash.com/photo-1654860687488-119a90eafa86"
            />
            <KartuProgram
              icon={<Star className="w-12 h-12" />}
              title="Program Khusus"
              description="Program pengembangan khusus untuk meningkatkan kemampuan dalam bidang Al-Quran dan seni Islami."
              features={[
                "Tahsin dan tahfiz Al-Qur'an",
                "Studi hadis dan ilmu hadis",
                "Tadabbur dan tafsir Al-Qur'an",
                "Seni Islami"
              ]}
              imageUrl="https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c"
            />
          </div>
        </div>
      </section>

      {/* Fitur Kurikulum */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Fitur Kurikulum Kami</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <KartuFitur
              icon={<BookOpen />}
              title="Pembelajaran Agama Islam"
              description="Pengenalan dasar-dasar agama Islam, akhlak, dan ibadah sehari-hari untuk anak-anak"
            />
            <KartuFitur
              icon={<Brain />}
              title="Pembelajaran Akademik"
              description="Pengembangan kemampuan dasar seperti membaca, menulis, dan berhitung dengan metode yang menyenangkan"
            />
            <KartuFitur
              icon={<Book />}
              title="Pengenalan Al-Qur'an"
              description="Pembelajaran huruf hijaiyah, tajwid dasar, dan pengenalan tafsir sederhana untuk anak-anak"
            />
            <KartuFitur
              icon={<Star />}
              title="Tahsin dan Tahfiz"
              description="Program khusus untuk meningkatkan kualitas bacaan dan hafalan Al-Qur'an"
            />
            <KartuFitur
              icon={<Heart />}
              title="Pengembangan Karakter"
              description="Pembentukan akhlak mulia dan karakter Islami dalam kehidupan sehari-hari"
            />
            <KartuFitur
              icon={<Music />}
              title="Seni Islami"
              description="Pengembangan kreativitas melalui seni kaligrafi dan kesenian Islami lainnya"
            />
          </div>
        </div>
      </section>

      {/* Bagian CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Bergabunglah dengan Keluarga Sekolah Kami</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Berikan anak Anda hadiah pendidikan berkualitas yang berakar pada nilai-nilai Islam. Pendaftaran untuk tahun ajaran mendatang telah dibuka.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium"
          >
            Daftar Sekarang <GraduationCap className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

const KartuProgram = ({
  icon,
  title,
  description,
  features,
  imageUrl
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
}) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
    <div className="h-48 relative overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-blue-900/10" />
    </div>
    <div className="p-6">
      <div className="flex items-start space-x-4">
        <div className="text-blue-600">{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
      </div>
      <p className="mt-4 text-gray-600">{description}</p>
      <ul className="mt-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <Heart className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const KartuFitur = ({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);