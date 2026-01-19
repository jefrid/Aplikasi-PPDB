import { useState, useEffect, useCallback } from 'react';
import { Teacher } from '../types/teacher';
import { TeacherService } from '../services/TeacherService';

export function useTeachers() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTeachers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await TeacherService.getAll();
            setTeachers(data);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching teachers:', err);
            setError(err.message || 'Gagal memuat data pengajar');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);

    const deleteTeacher = async (id: string) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus pengajar ini?')) return;

        try {
            await TeacherService.delete(id);
            setTeachers(prev => prev.filter(t => t.id !== id));
        } catch (err: any) {
            console.error('Error deleting teacher:', err);
            alert('Gagal menghapus pengajar: ' + err.message);
        }
    };

    return {
        teachers,
        loading,
        error,
        refetch: fetchTeachers,
        deleteTeacher
    };
}
