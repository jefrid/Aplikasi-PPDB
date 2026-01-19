import { supabase } from "../lib/supabase";
import { UserProfile, UserRole } from "../types/auth";

export const authService = {
    /**
     * Login user and fetch profile data (role) simultaneously
     */
    async login(email: string, password: string): Promise<UserProfile> {
        // 1. Login to Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) throw new Error(authError.message);
        if (!authData.user) throw new Error("User tidak ditemukan");

        // 2. Fetch Role data from 'profiles' table
        const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("nama_lengkap, role")
            .eq("id", authData.user.id)
            .single();

        if (profileError) {
            // Fallback if profile doesn't exist (optional, mostly for dev or initial setup)
            // Check if admin by email
            if (email.includes('admin')) {
                return {
                    id: authData.user.id,
                    email: authData.user.email!,
                    nama_lengkap: 'Admin (Fallback)',
                    role: 'admin'
                };
            }
            throw new Error("Gagal mengambil data profil user.");
        }

        // 3. Combine and return clean data
        return {
            id: authData.user.id,
            email: authData.user.email!,
            nama_lengkap: profileData.nama_lengkap || 'User',
            role: profileData.role as UserRole,
        };
    },

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(error.message);
    },

    async getCurrentSession() {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    },

    async getUserProfile(userId: string): Promise<UserProfile | null> {
        const { data, error } = await supabase
            .from("profiles")
            .select("nama_lengkap, role")
            .eq("id", userId)
            .single();

        if (error || !data) return null;

        // We need email from auth user, which we might not have here easily if just by ID
        // But typically this is called when we have the session.
        // For now, let's just return what we have, might need to adjust signature if email is needed
        return {
            id: userId,
            email: '', // Placeholder, usually caller has it or we fetch fetch user from auth
            nama_lengkap: data.nama_lengkap || '',
            role: data.role as UserRole
        }
    }
};
