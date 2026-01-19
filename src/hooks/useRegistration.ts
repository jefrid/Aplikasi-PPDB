import { useState, useEffect, useCallback } from 'react'
import { RegistrationService } from '../services/RegistrationService'
import type { Registration } from '../types'

export const useRegistration = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchRegistrations = useCallback(async () => {
        try {
            setLoading(true)
            const data = await RegistrationService.getAllForAdmin()
            setRegistrations(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchRegistrations()
    }, [fetchRegistrations])

    const updateRegistrationStatus = async (id: number, status: 'menunggu_verifikasi' | 'diterima' | 'ditolak', catatan?: string) => {
        try {
            const updated = await RegistrationService.updateStatus(id, status, catatan)
            setRegistrations(prev => prev.map(r => r.id === id ? updated : r))
            return updated
        } catch (err) {
            throw err
        }
    }

    return { registrations, loading, error, updateRegistrationStatus, refreshRegistrations: fetchRegistrations }
}
