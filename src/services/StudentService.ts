import { supabase } from '../lib/supabase'
import type { Student, StudentInsert, StudentUpdate, Teacher, TeacherInsert, TeacherUpdate, StudentWithPendaftaran } from '../types'

export class StudentService {
  static async getAll(): Promise<StudentWithPendaftaran[]> {
    const { data, error } = await supabase
      .from('murid')
      .select(`
        *,
        pendaftaran (
          *,
          berkas_siswa(*)
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as any as StudentWithPendaftaran[] || []
  }

  static async getById(id: number): Promise<StudentWithPendaftaran> {
    const { data, error } = await supabase
      .from('murid')
      .select(`
        *,
        pendaftaran!inner(
          *,
          berkas_siswa(*)
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data as any as StudentWithPendaftaran
  }

  static async create(student: StudentInsert): Promise<Student> {
    const { data, error } = await supabase
      .from('murid')
      .insert(student)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async update(id: number, updates: StudentUpdate): Promise<Student> {
    const { data, error } = await supabase
      .from('murid')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('murid')
      .delete()
      .eq('id', id)

    if (error) throw error
  }


}

export class TeacherService {
  static async getAll(): Promise<Teacher[]> {
    const { data, error } = await supabase
      .from('pengajar')
      .select('*')
      .order('nama')

    if (error) throw error
    return data || []
  }

  static async getById(id: number): Promise<Teacher> {
    const { data, error } = await supabase
      .from('pengajar')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  static async create(teacher: TeacherInsert): Promise<Teacher> {
    const { data, error } = await supabase
      .from('pengajar')
      .insert(teacher)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async update(id: number, updates: TeacherUpdate): Promise<Teacher> {
    const { data, error } = await supabase
      .from('pengajar')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('pengajar')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
