import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    LayoutDashboard,
    CalendarDays,
    UserCheck,
    GraduationCap,
    CheckCircle,
    Building2,
    LogOut,
    Menu,
    X
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeSection?: 'dashboard' | 'verification' | 'events' | 'teachers' | 'students';
}

export default function AdminLayout({ children, activeSection = 'dashboard' }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            alert('Gagal logout');
        }
    };

    const navigation = [
        {
            name: 'Dashboard',
            path: '/admin',
            state: {},
            icon: LayoutDashboard,
            id: 'dashboard'
        },
        {
            name: 'Verifikasi Murid',
            path: '/admin/verifikasi',
            state: {},
            icon: CheckCircle,
            id: 'verification'
        },
        {
            name: 'Kelola Acara',
            path: '/admin/acara',
            state: {},
            icon: CalendarDays,
            id: 'events'
        },
        {
            name: 'Kelola Pengajar',
            path: '/admin/pengajar',
            state: {},
            icon: UserCheck,
            id: 'teachers'
        },
        {
            name: 'Kelola Murid',
            path: '/admin/murid',
            state: {},
            icon: GraduationCap,
            id: 'students'
        },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar Desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 mb-8">
                            <Building2 className="w-8 h-8 text-emerald-600 mr-3" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                                <p className="text-sm text-gray-600">SPS TPQ AL IKHLAS</p>
                            </div>
                        </div>

                        <nav className="mt-5 flex-1 flex flex-col divide-y divide-gray-200 overflow-y-auto">
                            <div className="px-2 space-y-1">
                                {navigation.map((item) => {
                                    const isActive = activeSection === item.id;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            state={item.state}
                                            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left ${isActive
                                                ? 'bg-emerald-100 border-r-2 border-emerald-500 text-emerald-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            <item.icon
                                                className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-emerald-500' : 'text-gray-400 group-hover:text-gray-500'
                                                    }`}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    );
                                })}
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

            {/* Mobile Header & Sidebar Overlay */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <Building2 className="w-8 h-8 text-emerald-600 mr-3" />
                        <span className="font-bold text-gray-900">Admin Panel</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Mobile sidebar overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 flex z-40 lg:hidden">
                        <div
                            className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-all">
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
                                    <Building2 className="w-8 h-8 text-emerald-600 mr-3" />
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                                        <p className="text-sm text-gray-600">SPS TPQ AL IKHLAS</p>
                                    </div>
                                </div>

                                <nav className="mt-5 px-2 space-y-1">
                                    {navigation.map((item) => {
                                        const isActive = activeSection === item.id;
                                        return (
                                            <Link
                                                key={item.name}
                                                to={item.path}
                                                state={item.state}
                                                onClick={() => setSidebarOpen(false)}
                                                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                    }`}
                                            >
                                                <item.icon
                                                    className={`mr-4 flex-shrink-0 h-6 w-6 ${isActive ? 'text-emerald-500' : 'text-gray-400 group-hover:text-gray-500'
                                                        }`}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        );
                                    })}

                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setSidebarOpen(false);
                                        }}
                                        className="group flex w-full items-center px-2 py-2 text-base font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-900 mt-4"
                                    >
                                        <LogOut className="mr-4 flex-shrink-0 h-6 w-6 text-red-400 group-hover:text-red-500" />
                                        Keluar
                                    </button>
                                </nav>
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
