import { useState, useEffect, useCallback } from 'react'
import { EventService } from '../services/EventService'
import type { Event } from '../types'

export const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true)
            const data = await EventService.getAll()
            setEvents(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchEvents()
    }, [fetchEvents])

    const deleteEvent = async (id: number) => {
        try {
            await EventService.delete(id)
            setEvents(prev => prev.filter(e => e.id !== id))
        } catch (err) {
            throw err
        }
    }

    return { events, loading, error, deleteEvent, refreshEvents: fetchEvents }
}
