import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    LogOut,
    Building2,
    Menu,
    X,
    User
} from 'lucide-react'

interface ParentLayoutProps {
    children: React.ReactNode
}

export default function ParentLayout({ children }: ParentLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { signOut, user } = useAuth()

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Anak Terdaftar', href: '/dashboard?view=children', icon: Users },
        { name: 'Daftar Anak Baru', href: '/dashboard/daftar', icon: GraduationCap },
    ]

    const handleLogout = async () => {
        try {
            await signOut()
            navigate('/')
        } catch (err) {
            console.error('Logout error:', err)
        }
    }

    const isActive = (path: string) => {
        return location.pathname === path
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar for Desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 mb-8">
                            <Building2 className="w-8 h-8 text-blue-600 mr-3" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Dashboard Wali</h1>
                                <p className="text-sm text-gray-600">TPQ Al-Ikhlas</p>
                            </div>
                        </div>

                        <nav className="mt-5 flex-1 flex flex-col divide-y divide-gray-200 overflow-y-auto">
                            <div className="px-2 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${isActive(item.href)
                                            ? 'bg-blue-100 border-r-2 border-blue-500 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <item.icon
                                            className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive(item.href) ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                                                }`}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-6 pt-6">
                                <div className="px-2 space-y-1">
                                    <button
                                        onClick={handleLogout}
                                        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left text-red-600 hover:bg-red-50 hover:text-red-900"
                                    >
                                        <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-red-400 group-hover:text-red-500" />
                                        Keluar
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                {/* Top bar */}
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow border-b border-gray-200">
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex-1 px-4 flex justify-between items-center">
                        <div className="flex-1 flex">
                            <div className="w-full flex md:ml-0">
                                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                    <h1 className="text-xl font-bold text-gray-800 my-auto pt-4">Sistem Informasi PPDB</h1>
                                </div>
                            </div>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="flex items-center space-x-3">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-gray-900">{user?.user_metadata?.nama_lengkap || user?.email}</p>
                                    <p className="text-xs text-gray-500">Wali Murid</p>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <User className="h-5 w-5 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 flex z-40 lg:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />

                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                type="button"
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X className="h-6 w-6 text-white" />
                            </button>
                        </div>

                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                            <div className="flex-shrink-0 flex items-center px-4 mb-8">
                                <Building2 className="w-8 h-8 text-blue-600 mr-3" />
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Dashboard Wali</h1>
                                    <p className="text-sm text-gray-600">TPQ Al-Ikhlas</p>
                                </div>
                            </div>

                            <nav className="mt-5 flex-1 px-2 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left ${isActive(item.href)
                                            ? 'bg-blue-100 border-r-2 border-blue-500 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <item.icon
                                            className={`mr-3 flex-shrink-0 h-6 w-6 ${isActive(item.href) ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                                                }`}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}

                                <button
                                    onClick={handleLogout}
                                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-left text-red-600 hover:bg-red-50 hover:text-red-900 mt-6"
                                >
                                    <LogOut className="mr-3 flex-shrink-0 h-6 w-6 text-red-400 group-hover:text-red-500" />
                                    Keluar
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
