import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'

// Acara Services
export const acaraService = {
  async getAll() {
    const { data, error } = await supabase
      .from('acara')
      .select('*')
      .order('tanggal_pelaksanaan', { ascending: true })

    if (error) throw error
    return data
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from('acara')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(acara: Database['public']['Tables']['acara']['Insert']) {
    const { data, error } = await supabase
      .from('acara')
      .insert(acara)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: number, acara: Database['public']['Tables']['acara']['Update']) {
    const { data, error } = await supabase
      .from('acara')
      .update(acara)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('acara')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Pengajar Services
export const pengajarService = {
  async getAll() {
    const { data, error } = await supabase
      .from('pengajar')
      .select('*')
      .order('nama')

    if (error) throw error
    return data
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from('pengajar')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(pengajar: Database['public']['Tables']['pengajar']['Insert']) {
    const { data, error } = await supabase
      .from('pengajar')
      .insert(pengajar)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: number, pengajar: Database['public']['Tables']['pengajar']['Update']) {
    const { data, error } = await supabase
      .from('pengajar')
      .update(pengajar)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('pengajar')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Pendaftaran Services
export const pendaftaranService = {
  async getAllForAdmin() {
    const { data, error } = await supabase
      .from('pendaftaran')
      .select(`
        *,
        profiles!inner(email, nama_lengkap),
        berkas_siswa(*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('pendaftaran')
      .select(`
        *,
        berkas_siswa(*)
      `)
      .eq('id_wali', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async create(pendaftaran: Database['public']['Tables']['pendaftaran']['Insert']) {
    const { data, error } = await supabase
      .from('pendaftaran')
      .insert(pendaftaran)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateStatus(id: number, status: 'menunggu_verifikasi' | 'diterima' | 'ditolak', catatan?: string) {
    const { data, error } = await supabase
      .from('pendaftaran')
      .update({
        status,
        catatan_admin: catatan
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: number, updates: Partial<Database['public']['Tables']['pendaftaran']['Update']>) {
    const { data, error } = await supabase
      .from('pendaftaran')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('pendaftaran')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Berkas Services
export const berkasService = {
  async uploadFile(file: File, idPendaftaran: number, jenisDokumen: string) {
    const fileName = `berkas-${idPendaftaran}-${Date.now()}-${file.name}`

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('berkas_ppdb')
      .upload(fileName, file)

    if (uploadError) throw uploadError

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('berkas_ppdb')
      .getPublicUrl(fileName)

    // Save to database
    const { data, error } = await supabase
      .from('berkas_siswa')
      .insert({
        id_pendaftaran: idPendaftaran,
        jenis_dokumen: jenisDokumen,
        url_file: urlData.publicUrl
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getByPendaftaranId(idPendaftaran: number) {
    const { data, error } = await supabase
      .from('berkas_siswa')
      .select('*')
      .eq('id_pendaftaran', idPendaftaran)

    if (error) throw error
    return data
  }
}

// Murid Services
export const muridService = {
  async getAll() {
    const { data, error } = await supabase
      .from('murid')
      .select(`
        *,
        pendaftaran!inner(nama_siswa)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from('murid')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async update(id: number, murid: Database['public']['Tables']['murid']['Update']) {
    const { data, error } = await supabase
      .from('murid')
      .update(murid)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}
