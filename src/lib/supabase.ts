import { createClient } from '@supabase/supabase-js'

// Clear old localStorage tokens to prevent confusion with new sessionStorage logic
const SUPABASE_KEY_NAME = 'sb-' + import.meta.env.VITE_SUPABASE_URL?.split('//')[1].split('.')[0] + '-auth-token'
if (window.localStorage.getItem(SUPABASE_KEY_NAME)) {
    console.log('🧹 Clearing simplified legacy auth token from localStorage')
    window.localStorage.removeItem(SUPABASE_KEY_NAME)
}
// Also try generic clear for safety if key prediction is hard, but let's try specific first.
// Or just clear all 'sb-*' keys?
Object.keys(window.localStorage).forEach(key => {
    if (key.startsWith('sb-') && key.endsWith('-auth-token')) {
        console.log('🧹 Clearing legacy auth token:', key)
        window.localStorage.removeItem(key)
    }
})

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase environment variables not found!')
    console.error('Please create .env.local file with:')
    console.error('VITE_SUPABASE_URL=https://your-project-id.supabase.co')
    console.error('VITE_SUPABASE_ANON_KEY=your-anon-key-here')
    throw new Error('Missing Supabase environment variables')
}

console.log('✅ Supabase client initialized:', supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: sessionStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
})

// Database types sesuai dengan schema Anda
export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    nama_lengkap: string | null
                    role: 'admin' | 'wali_murid'
                    created_at: string
                }
                Insert: {
                    id: string
                    email: string
                    nama_lengkap?: string | null
                    role?: 'admin' | 'wali_murid'
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    nama_lengkap?: string | null
                    role?: 'admin' | 'wali_murid'
                    created_at?: string
                }
            }
            acara: {
                Row: {
                    id: number
                    judul: string
                    tanggal_pelaksanaan: string
                    deskripsi_singkat: string | null
                    lokasi: string | null
                    kuota_peserta: number | null
                    detail_acara: string | null
                    gambar_url: string | null
                    created_at: string
                }
                Insert: {
                    judul: string
                    tanggal_pelaksanaan: string
                    deskripsi_singkat?: string | null
                    lokasi?: string | null
                    kuota_peserta?: number | null
                    detail_acara?: string | null
                    gambar_url?: string | null
                }
                Update: {
                    judul?: string
                    tanggal_pelaksanaan?: string
                    deskripsi_singkat?: string | null
                    lokasi?: string | null
                    kuota_peserta?: number | null
                    detail_acara?: string | null
                    gambar_url?: string | null
                }
            }
            pengajar: {
                Row: {
                    id: number
                    nip: string
                    nama: string
                    jabatan: string | null
                    bidang: string | null
                    email: string | null
                    telepon: string | null
                    foto_url: string | null
                    created_at: string
                }
                Insert: {
                    nip: string
                    nama: string
                    jabatan?: string | null
                    bidang?: string | null
                    email?: string | null
                    telepon?: string | null
                    foto_url?: string | null
                }
                Update: {
                    nip?: string
                    nama?: string
                    jabatan?: string | null
                    bidang?: string | null
                    email?: string | null
                    telepon?: string | null
                    foto_url?: string | null
                }
            }
            pendaftaran: {
                Row: {
                    id: number
                    id_wali: string
                    nama_siswa: string
                    nisn: string | null
                    tempat_lahir: string | null
                    tanggal_lahir: string | null
                    jenis_kelamin: 'L' | 'P' | null
                    alamat_rumah: string | null
                    asal_sekolah: string | null
                    status: 'menunggu_verifikasi' | 'diterima' | 'ditolak'
                    catatan_admin: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id_wali: string
                    nama_siswa: string
                    nisn?: string | null
                    tempat_lahir?: string | null
                    tanggal_lahir?: string | null
                    jenis_kelamin?: 'L' | 'P' | null
                    alamat_rumah?: string | null
                    asal_sekolah?: string | null
                    status?: 'menunggu_verifikasi' | 'diterima' | 'ditolak'
                    catatan_admin?: string | null
                }
                Update: {
                    nama_siswa?: string
                    nisn?: string | null
                    tempat_lahir?: string | null
                    tanggal_lahir?: string | null
                    jenis_kelamin?: 'L' | 'P' | null
                    alamat_rumah?: string | null
                    asal_sekolah?: string | null
                    status?: 'menunggu_verifikasi' | 'diterima' | 'ditolak'
                    catatan_admin?: string | null
                }
            }
            berkas_siswa: {
                Row: {
                    id: number
                    id_pendaftaran: number
                    jenis_dokumen: string
                    url_file: string
                    uploaded_at: string
                }
                Insert: {
                    id_pendaftaran: number
                    jenis_dokumen: string
                    url_file: string
                }
                Update: {
                    jenis_dokumen?: string
                    url_file?: string
                }
            }
            murid: {
                Row: {
                    id: number
                    id_pendaftaran: number
                    nis_lokal: string | null
                    kelas: string | null
                    status_aktif: boolean | null
                    created_at: string
                }
                Insert: {
                    id_pendaftaran: number
                    nis_lokal?: string | null
                    kelas?: string | null
                    status_aktif?: boolean | null
                }
                Update: {
                    nis_lokal?: string | null
                    kelas?: string | null
                    status_aktif?: boolean | null
                }
            }
        }
    }
}
