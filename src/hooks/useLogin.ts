import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { UserProfile } from "../types/auth";
import Cookies from "js-cookie";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const user: UserProfile = await authService.login(email, password);

            // Set simple cookie for middleware/persistence hints if needed
            // (Though Supabase handles session, user requested manual cookie logic previously)
            if (user.role === 'admin') {
                Cookies.set('adminToken', 'true', { expires: 1 }); // 1 day
            } else {
                Cookies.set('userToken', 'true', { expires: 1 });
            }

            // Redirect Logic based on Role
            if (user.role === "admin") {
                navigate("/admin");
            } else if (user.role === "wali_murid") {
                navigate("/dashboard");
            } else {
                // Default redirect
                navigate("/");
            }

            return user;
        } catch (err: any) {
            console.error("Login failed:", err);
            let errorMessage = "Terjadi kesalahan saat login";

            if (err.message) {
                if (err.message.includes('Invalid login credentials')) {
                    errorMessage = 'Email atau password salah';
                } else {
                    errorMessage = err.message;
                }
            }

            setError(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            // Remove cookies
            Cookies.remove('adminToken');
            Cookies.remove('userToken');

            // Navigate to home
            navigate('/');
        } catch (err) {
            console.error("Logout failed:", err);
            // Even if supabase fails, we should clear local state
            Cookies.remove('adminToken');
            Cookies.remove('userToken');
            navigate('/');
        }
    };

    return {
        login: handleLogin,
        logout: handleLogout,
        loading,
        error,
    };
}
