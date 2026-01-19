import { supabase } from '../lib/supabase'

interface UploadImageResult {
    path: string
    url: string
}

class ImagesService {
    async uploadImage(
        file: File,
        bucket: string = "berkas_ppdb",
        folderPath: string = "",
    ): Promise<UploadImageResult> {
        try {
            // Generate a unique file name
            const fileExt = file.name.split(".").pop()
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`

            // Create full path with optional folder
            const filePath = folderPath ? `${folderPath}/${fileName}` : fileName

            // Upload file to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: false,
                })

            if (uploadError) {
                console.error('Upload error:', uploadError)
                throw uploadError
            }

            // Get public URL
            const { data } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath)

            return {
                path: filePath,
                url: data.publicUrl,
            }
        } catch (error) {
            console.error('Error in uploadImage:', error)
            throw error
        }
    }

    async deleteImage(path: string, bucket: string = "berkas_ppdb"): Promise<boolean> {
        try {
            const { error } = await supabase.storage
                .from(bucket)
                .remove([path])

            if (error) {
                console.error('Delete error:', error)
                throw error
            }

            return true
        } catch (error) {
            console.error('Error in deleteImage:', error)
            throw error
        }
    }

    // Get multiple public URLs from paths
    getPublicUrls(paths: string[], bucket: string = "berkas_ppdb") {
        return paths.map((path) => {
            const { data } = supabase.storage.from(bucket).getPublicUrl(path)
            return data.publicUrl
        })
    }

    // Get single public URL from path
    getPublicUrl(path: string, bucket: string = "berkas_ppdb"): string {
        const { data } = supabase.storage.from(bucket).getPublicUrl(path)
        return data.publicUrl
    }
}

export const imagesService = new ImagesService()
