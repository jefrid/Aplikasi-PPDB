import type { Database } from './lib/supabase'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Acara = Database['public']['Tables']['acara']['Row']
export type Pengajar = Database['public']['Tables']['pengajar']['Row']
export type Pendaftaran = Database['public']['Tables']['pendaftaran']['Row']
export type BerkasSiswa = Database['public']['Tables']['berkas_siswa']['Row']
export type Murid = Database['public']['Tables']['murid']['Row']

// Aliases for English Codebase Compatibility
export type Event = Acara
export type EventInsert = Database['public']['Tables']['acara']['Insert']
export type EventUpdate = Database['public']['Tables']['acara']['Update']

export type Student = Murid
export type StudentInsert = Database['public']['Tables']['murid']['Insert']
export type StudentUpdate = Database['public']['Tables']['murid']['Update']

export type Teacher = Pengajar
export type TeacherInsert = Database['public']['Tables']['pengajar']['Insert']
export type TeacherUpdate = Database['public']['Tables']['pengajar']['Update']

export type Registration = Pendaftaran
export type RegistrationInsert = Database['public']['Tables']['pendaftaran']['Insert']
export type RegistrationUpdate = Database['public']['Tables']['pendaftaran']['Update']

export type Document = BerkasSiswa
export type DocumentInsert = Database['public']['Tables']['berkas_siswa']['Insert']

// Extended types for UI
export interface PendaftaranWithRelations extends Pendaftaran {
  berkas_siswa?: Document[]
}

export interface StudentWithPendaftaran extends Murid {
  pendaftaran: PendaftaranWithRelations
  nama_lengkap?: string | null
  alamat?: string | null
}

// Form types
export interface PendaftaranFormData {
  id_wali: string
  nama_siswa: string
  tempat_lahir: string
  tanggal_lahir: string
  jenis_kelamin: 'L' | 'P'
  alamat_rumah: string
  status: 'menunggu_verifikasi' | 'diterima' | 'ditolak'
  created_at: string
  updated_at: string
  catatan_admin?: string
  berkas_siswa?: Document[]
}

export interface BerkasUploadData {
  jenis_dokumen: string
  file: File
}

// Legacy interfaces (untuk kompatibilitas)
export interface ArtikelBerita {
  id: string
  judul: string
  konten: string
  penulis: string
  tanggal: string
  urlGambar?: string
}

export interface Fasilitas {
  id: string
  nama: string
  deskripsi: string
  urlGambar: string
}