import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/logo.png'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuth()

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)

    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Program', href: '/program' },
    { name: 'Acara', href: '/acara' },
    { name: 'Pengajar', href: '/pengajar' },
    { name: 'Kontak', href: '/kontak' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="SPS TPQ AL IKHLAS LEBAKBARANG"
              className="h-10 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-green-700 font-bold text-lg">SPS TPQ AL IKHLAS</span>
              <span className="text-green-600 text-sm">LEBAKBARANG</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium ${isActive(item.href)
                  ? 'text-green-600'
                  : 'text-gray-600 hover:text-green-600'
                  }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {profile?.nama_lengkap || user.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    {profile?.role === 'admin' ? 'Dashboard Admin' : 'Dashboard Wali'}
                  </p>
                </div>
                <Link
                  to={profile?.role === 'admin' ? '/admin' : '/dashboard'}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {isLoggingOut ? 'Keluar...' : 'Keluar'}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Masuk
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium ${isActive(item.href)
                  ? 'text-green-600'
                  : 'text-gray-600 hover:text-green-600'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              {user ? (
                <div className="space-y-2">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {profile?.nama_lengkap || user.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {profile?.role === 'admin' ? 'Dashboard Admin' : 'Dashboard Wali'}
                    </p>
                  </div>
                  <Link
                    to={profile?.role === 'admin' ? '/admin' : '/dashboard'}
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2 inline" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-900 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2 inline" />
                    Keluar
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogOut className="w-4 h-4 mr-2 inline" />
                    Masuk
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 