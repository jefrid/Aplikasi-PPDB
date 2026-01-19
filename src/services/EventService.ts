import { supabase } from '../lib/supabase'
import type { Event, EventInsert, EventUpdate } from '../types'

export class EventService {
    static async getAll(): Promise<Event[]> {
        const { data, error } = await supabase
            .from('acara')
            .select('*')
            .order('tanggal_pelaksanaan', { ascending: true })

        if (error) throw error
        return data || []
    }

    static async getById(id: number): Promise<Event> {
        const { data, error } = await supabase
            .from('acara')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    }

    static async create(event: EventInsert): Promise<Event> {
        const { data, error } = await supabase
            .from('acara')
            .insert(event)
            .select()
            .single()

        if (error) throw error
        return data
    }

    static async update(id: number, updates: EventUpdate): Promise<Event> {
        const { data, error } = await supabase
            .from('acara')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase
            .from('acara')
            .delete()
            .eq('id', id)

        if (error) throw error
    }

    // Upload gambar acara
    static async uploadEventImage(file: File): Promise<string> {
        const { imagesService } = await import('./ImagesService')
        const result = await imagesService.uploadImage(file, 'berkas_ppdb', 'acara')
        return result.url
    }
}
