import { supabase } from '../lib/supabase'
import type { Registration, RegistrationInsert, RegistrationUpdate, Document, DocumentInsert, PendaftaranWithRelations } from '../types'

export class RegistrationService {
  static async getAllForAdmin(): Promise<PendaftaranWithRelations[]> {
    const { data, error } = await supabase
      .from('pendaftaran')
      .select(`
        *,
        profiles!inner(email, nama_lengkap),
        berkas_siswa(*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  static async getByUserId(userId: string): Promise<PendaftaranWithRelations[]> {
    const { data, error } = await supabase
      .from('pendaftaran')
      .select(`
        *,
        berkas_siswa(*)
      `)
      .eq('id_wali', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  static async create(registration: RegistrationInsert): Promise<Registration> {
    const { data, error } = await supabase
      .from('pendaftaran')
      .insert(registration)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateStatus(
    id: number,
    status: 'menunggu_verifikasi' | 'diterima' | 'ditolak',
    catatan?: string
  ): Promise<Registration> {
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

    // Automatically create Student record if approved
    if (status === 'diterima' && data) {
      // Check if student already exists
      const { data: existingStudent } = await supabase
        .from('murid')
        .select('id')
        .eq('id_pendaftaran', id)
        .single()

      if (!existingStudent) {
        // Create new student
        const { error: createError } = await supabase
          .from('murid')
          .insert({
            id_pendaftaran: id,
            nama_lengkap: data.nama_siswa,
            tanggal_lahir: data.tanggal_lahir,
            jenis_kelamin: data.jenis_kelamin,
            alamat: data.alamat_rumah,
            status: 'aktif',
            // Default values
            email: '',
            nis_lokal: null
          })

        if (createError) {
          console.error('Error creating student record:', createError)
          // Optional: revert status or warn user
        }
      }
    }

    return data
  }

  static async update(id: number, updates: RegistrationUpdate): Promise<Registration> {
    const { data, error } = await supabase
      .from('pendaftaran')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('pendaftaran')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

export class DocumentService {
  static async uploadFile(file: File, idPendaftaran: number, jenisDokumen: string): Promise<Document> {
    const { imagesService } = await import('./ImagesService')

    // 1. Check for existing document
    const { data: existingDocs } = await supabase
      .from('berkas_siswa')
      .select('id, url_file')
      .eq('id_pendaftaran', idPendaftaran)
      .eq('jenis_dokumen', jenisDokumen)

    // 2. Delete existing if found (Replace logic)
    if (existingDocs && existingDocs.length > 0) {
      for (const doc of existingDocs) {
        // Optional: Delete from storage if possible using imagesService?
        await supabase
          .from('berkas_siswa')
          .delete()
          .eq('id', doc.id)
      }
    }

    // 3. Upload new file
    const result = await imagesService.uploadImage(file, 'berkas_ppdb', `pendaftar/${idPendaftaran}`)

    // 4. Save to database
    const { data, error } = await supabase
      .from('berkas_siswa')
      .insert({
        id_pendaftaran: idPendaftaran,
        jenis_dokumen: jenisDokumen,
        url_file: result.url
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async getByRegistrationId(idPendaftaran: number): Promise<Document[]> {
    const { data, error } = await supabase
      .from('berkas_siswa')
      .select('*')
      .eq('id_pendaftaran', idPendaftaran)

    if (error) throw error
    return data || []
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('berkas_siswa')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
