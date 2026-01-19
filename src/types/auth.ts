export type UserRole = 'admin' | 'wali_murid';

export interface UserProfile {
    id: string;
    email: string;
    nama_lengkap: string;
    role: UserRole;
}

export interface AuthResponse {
    user: UserProfile | null;
    error: string | null;
}
