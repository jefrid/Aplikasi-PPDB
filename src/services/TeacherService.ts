import { supabase } from '../lib/supabase';
import { Teacher, TeacherFormData } from '../types/teacher';

const TABLE_NAME = 'pengajar'; // Confirmed by user
const BUCKET_NAME = 'berkas_ppdb'; // Using confirmed existing bucket

export const TeacherService = {
    async getAll() {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Teacher[];
    },

    async getById(id: string) {
        const { data, error } = await supabase
            .from(TABLE_NAME)
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as Teacher;
    },

    async create(formData: TeacherFormData) {
        let foto_url = '';

        // Upload Image if exists
        if (formData.foto) {
            const fileExt = formData.foto.name.split('.').pop();
            const fileName = `pengajar/${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(filePath, formData.foto);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(filePath);

            foto_url = publicUrlData.publicUrl;
        }

        const newTeacher: Partial<Teacher> = {
            nip: formData.nip,
            nama: formData.nama,
            jabatan: formData.jabatan,
            bidang: formData.bidang,
            email: formData.email,
            telepon: formData.telepon,
            foto_url: foto_url || undefined,
        };

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .insert([newTeacher])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async update(id: string, formData: TeacherFormData) {
        let foto_url = undefined;

        // Upload New Image if exists
        if (formData.foto) {
            const fileExt = formData.foto.name.split('.').pop();
            const fileName = `pengajar/${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(filePath, formData.foto);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(filePath);

            foto_url = publicUrlData.publicUrl;
        }

        const updates: Partial<Teacher> = {
            nip: formData.nip,
            nama: formData.nama,
            jabatan: formData.jabatan,
            bidang: formData.bidang,
            email: formData.email,
            telepon: formData.telepon,
        };

        if (foto_url) {
            updates.foto_url = foto_url;
        }

        const { data, error } = await supabase
            .from(TABLE_NAME)
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async delete(id: string) {
        const { error } = await supabase
            .from(TABLE_NAME)
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
