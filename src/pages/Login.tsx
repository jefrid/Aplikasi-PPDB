import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Building2, BookOpen, Users, GraduationCap, Shield, AlertCircle, Lock, User as UserIcon, LogIn } from 'lucide-react';
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { user, profile } = useAuth();

  // Redirect Logic
  useEffect(() => {
    if (user && profile) {
      if (profile.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, profile, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      // Success is handled by useEffect
    } catch (err: any) {
      console.error("Login failed:", err);
      let msg = err.message;
      if (msg.includes("Invalid login credentials")) msg = "Email atau password salah.";
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Welcome Section - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex flex-col justify-center items-center p-8">
          <div className="text-center space-y-6">
            {/* Logo/Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-xl">
              <Building2 className="w-12 h-12 text-white" />
            </div>

            {/* Branding */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">SPS TPQ</h1>
              <h2 className="text-3xl font-semibold text-blue-600">AL IKHLAS</h2>
              <p className="text-xl text-gray-600 font-medium">LEBAKBARANG</p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-4 mt-8 w-full max-w-md">
              <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 transform hover:scale-105 transition-transform duration-300">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Tahfidz Al-Quran</h3>
                  <p className="text-sm text-gray-600">Program menghafal Al-Quran</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 transform hover:scale-105 transition-transform duration-300 delay-75">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Pengajaran Islami</h3>
                  <p className="text-sm text-gray-600">Pendidikan agama komprehensif</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 transform hover:scale-105 transition-transform duration-300 delay-150">
                <div className="p-3 bg-green-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Pembinaan Akhlak</h3>
                  <p className="text-sm text-gray-600">Pembentukan karakter mulia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="text-center mb-8">
            {/* Mobile Logo - Visible only on mobile */}
            <div className="lg:hidden mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Selamat Datang</h2>
            <p className="text-gray-600 text-lg">
              Masuk untuk mengakses dashboard Anda
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center space-x-3 animate-pulse">
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <p className="font-medium text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg"
                    placeholder="Masukkan email Anda"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                    Lupa password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg"
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-blue-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 cursor-pointer">
                Ingat saya
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sedang Masuk...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <LogIn className="w-5 h-5" />
                  <span>Masuk Sekarang</span>
                </div>
              )}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Belum punya akun?{' '}
                <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                  Daftar di sini
                </Link>
              </p>
            </div>
          </form>

          {/* Admin Demo Info */}
          <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-start space-x-3 hover:bg-blue-50 transition-colors">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">Akun Admin Demo</p>
              <div className="space-y-1">
                <p><span className="font-medium opacity-75">Email:</span> admin@spstpqalikhlash.com</p>
                <p><span className="font-medium opacity-75">Password:</span> admin123</p>
              </div>
              <p className="text-xs text-blue-600 mt-2 italic">Pastikan sudah setup akun admin di Supabase</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
