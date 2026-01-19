import { useState, useEffect, useCallback } from 'react'
import { StudentService, TeacherService } from '../services/StudentService'
import type { Student, StudentUpdate, Teacher, StudentWithPendaftaran } from '../types'

export function useStudents() {
    const [students, setStudents] = useState<StudentWithPendaftaran[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchStudents = useCallback(async () => {
        try {
            setLoading(true)
            const data = await StudentService.getAll()
            setStudents(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchStudents()
    }, [fetchStudents])

    const updateStudent = async (id: number, updates: StudentUpdate) => {
        try {
            const updated = await StudentService.update(id, updates)
            // Ideally explicit refetch or manual merge of pendaftaran, but for now assuming update only affects flat fields
            setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s))
            return updated
        } catch (err) {
            throw err
        }
    }

    const deleteStudent = async (id: number) => {
        try {
            await StudentService.delete(id)
            setStudents(prev => prev.filter(s => s.id !== id))
        } catch (err) {
            throw err
        }
    }

    return { students, loading, error, updateStudent, deleteStudent, refreshStudents: fetchStudents }
}

export const useTeachers = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchTeachers = useCallback(async () => {
        try {
            setLoading(true)
            const data = await TeacherService.getAll()
            setTeachers(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTeachers()
    }, [fetchTeachers])

    const deleteTeacher = async (id: number) => {
        try {
            await TeacherService.delete(id)
            setTeachers(prev => prev.filter(t => t.id !== id))
        } catch (err) {
            throw err
        }
    }

    return { teachers, loading, error, deleteTeacher, refreshTeachers: fetchTeachers }
}
