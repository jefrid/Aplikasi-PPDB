import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthContextType {
    user: User | null
    session: Session | null
    profile: Profile | null
    loading: boolean
    signUp: (email: string, password: string, metadata?: Record<string, unknown>) => Promise<{ data: { user: User | null; session: Session | null }; error: Error | null }>
    signIn: (email: string, password: string) => Promise<{ data: { user: User | null; session: Session | null }; error: Error | null }>
    signOut: () => Promise<{ error: Error | null }>
    isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [fetchingProfileFor, setFetchingProfileFor] = useState<string | null>(null)

    // Helper to derive profile from session immediately
    const deriveProfileFromUser = (user: User): Profile => {
        const isEmailAdmin = user.email?.includes('admin')
        const metadataRole = user.user_metadata?.role

        return {
            id: user.id,
            email: user.email || '',
            nama_lengkap: user.user_metadata?.nama_lengkap || user.email?.split('@')[0] || 'User',
            role: metadataRole || (isEmailAdmin ? 'admin' : 'wali_murid'),
            created_at: new Date().toISOString(),
        } as unknown as Profile
    }

    useEffect(() => {
        console.log('AuthContext initializing (Secure)...')
        let mounted = true

        // 1. Initial Check: Validate with server using getUser()
        // This prevents the "flash of content" from invalid/expired local sessions
        const initAuth = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser()

                if (error) throw error

                if (mounted && user) {
                    console.log('👤 Secure user verification success')
                    // Get session data to sync
                    const { data: { session } } = await supabase.auth.getSession()
                    setSession(session)
                    setUser(user)

                    const optimisticProfile = deriveProfileFromUser(user)
                    setProfile(optimisticProfile)

                    // Fetch full profile in background
                    await fetchProfile(user.id)
                }
            } catch (error) {
                console.log('⚠️ No valid session found or session invalid:', error)
                if (mounted) {
                    setSession(null)
                    setUser(null)
                    setProfile(null)
                }
            } finally {
                if (mounted) setLoading(false)
            }
        }

        initAuth()

        // 2. Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('🔄 Auth state change:', event)
            if (!mounted) return

            // Handle only subsequent updates, or synced updates
            // (Note: onAuthStateChange fires SIGNED_IN/INITIAL_SESSION. 
            // We trust getUser() for the initial blocker, but we update state here for others)

            setSession(session)
            const currentUser = session?.user ?? null
            setUser(currentUser)

            if (currentUser) {
                if (!profile || profile.id !== currentUser.id) {
                    const optimistic = deriveProfileFromUser(currentUser)
                    setProfile(optimistic)
                }

                // Only if we haven't done the initial load yet, let's not flip loading just yet 
                // to avoid racing with initAuth. But typically initAuth finishes first or manages loading.
                // However, on SIGNED_OUT, we want to clear immediately.
            } else {
                setProfile(null)
            }

            // Should we touch setLoading here? 
            // If initAuth is false, we are essentially done. 
            // If we sign out, we can ensure loading is false.
            if (event === 'SIGNED_OUT') {
                setLoading(false)
            }
        })

        return () => {
            mounted = false
            subscription.unsubscribe()
        }
    }, [])

    const fetchProfile = async (userId: string) => {
        if (fetchingProfileFor === userId) return
        setFetchingProfileFor(userId)

        try {
            // Add timeout to prevent hanging (15s as requested)
            const queryPromise = supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle()

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Profile query timeout')), 15000)
            })

            const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any

            if (data) {
                console.log('✅ Background profile sync successful')
                setProfile(data)
            } else if (error) {
                console.warn('⚠️ Background profile sync failed (keeping optimistic):', error.message)
            }
        } catch (err: any) {
            console.warn('⚠️ Profile fetch error (keeping optimistic):', err.message)
            // Do NOT throw error or logout. We stay signed in with the optimistic profile.
        } finally {
            setFetchingProfileFor(null)
        }
    }

    const signUp = async (email: string, password: string, metadata?: Record<string, unknown>) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metadata
            }
        })
        return { data, error }
    }

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        return { data, error }
    }

    const signOut = async () => {
        // Clear local state immediately for speed
        setUser(null)
        setSession(null)
        setProfile(null)
        setLoading(false)

        const { error } = await supabase.auth.signOut()
        return { error }
    }

    const isAdmin = profile?.role === 'admin'

    const value = {
        user,
        session,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        isAdmin
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
