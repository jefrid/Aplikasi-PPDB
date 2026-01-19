import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, Building2, BookOpen, Users, GraduationCap, Shield, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    namaLengkap: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowPasswordConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { signUp, user } = useAuth()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear errors when user starts typing
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.namaLengkap) {
      setError('Semua field harus diisi')
      return false
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password konfirmasi tidak cocok')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Format email tidak valid')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateForm()) return

    setIsLoading(true)

    try {
      console.log('🔄 Starting registration process...')

      const { data, error } = await signUp(formData.email, formData.password, {
        nama_lengkap: formData.namaLengkap,
        role: 'wali_murid'
      })

      if (error) {
        console.error('❌ Registration error:', error)

        if (error.message.includes('already registered') || error.message.includes('already been registered')) {
          setError('Email sudah terdaftar. Silakan gunakan email lain atau langsung login.')
        } else if (error.message.includes('Password should be at least')) {
          setError('Password terlalu lemah. Minimal 6 karakter.')
        } else if (error.message.includes('Invalid email')) {
          setError('Format email tidak valid.')
        } else {
          setError(`Registrasi gagal: ${error.message}`)
        }
        return
      }

      if (data?.user) {
        console.log('✅ User created:', data.user.id)
        // Profile creation is now handled by AuthContext and database trigger
      }

      setSuccess('🎉 Registrasi berhasil! Silakan login dengan email dan password Anda.')

      // Clear form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        namaLengkap: ''
      })

    } catch (err) {
      console.error('Registration error:', err)
      setError('Terjadi kesalahan saat registrasi. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Welcome Section - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex flex-col justify-center items-center p-8">
          <div className="text-center space-y-6">
            {/* Logo/Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-xl">
              <Building2 className="w-12 h-12 text-white" />
            </div>

            {/* Branding */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">SPS TPQ</h1>
              <h2 className="text-3xl font-semibold text-blue-600">AL IKHLAS</h2>
              <p className="text-xl text-gray-600 font-medium">LEBAKBARANG</p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-4 mt-8">
              <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Pendaftaran Online</h3>
                  <p className="text-sm text-gray-600">Proses pendaftaran yang mudah dan cepat</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Pantau Progress</h3>
                  <p className="text-sm text-gray-600">Lihat perkembangan anak secara real-time</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Akses Lengkap</h3>
                  <p className="text-sm text-gray-600">Dashboard wali murid dengan fitur lengkap</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="text-center mb-8">
            {/* Mobile Logo - Visible only on mobile */}
            <div className="lg:hidden mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Daftar Akun Baru
            </h2>
            <p className="text-gray-600 text-lg">
              Buat akun wali murid untuk mengakses sistem PPDB
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <p className="font-medium">{success}</p>
              </div>
            )}

            <div className="space-y-5">
              {/* Full Name Field */}
              <div>
                <label htmlFor="namaLengkap" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    id="namaLengkap"
                    name="namaLengkap"
                    type="text"
                    required
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.namaLengkap}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg"
                    placeholder="Masukkan email Anda"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg"
                    placeholder="Minimal 6 karakter"
                    value={formData.password}
                    onChange={handleInputChange}
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

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="block w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg"
                    placeholder="Ulangi password Anda"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-blue-600 transition-colors"
                    onClick={() => setShowPasswordConfirm(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <svg className="-ml-1 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Mendaftarkan...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <User className="w-6 h-6" />
                    <span>Daftar Akun</span>
                  </div>
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Sudah punya akun?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Masuk di sini
                </Link>
              </p>
            </div>

            {/* Terms and Privacy */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mt-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2">
                    Syarat & Ketentuan
                  </h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Data Anda akan disimpan dengan aman</p>
                    <p>• Email akan digunakan untuk komunikasi penting</p>
                    <p>• Password minimal 6 karakter untuk keamanan</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


