export interface Teacher {
    id?: string;
    nip: string;
    nama: string;
    jabatan: string;
    bidang: string;
    email: string;
    telepon: string;
    foto_url?: string;
    created_at?: string;
}

export interface TeacherFormData {
    nip: string;
    nama: string;
    jabatan: string;
    bidang: string;
    email: string;
    telepon: string;
    foto?: File | null;
}
