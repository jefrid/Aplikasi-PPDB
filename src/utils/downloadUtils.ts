import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { StudentWithPendaftaran } from '../types'

export const downloadStudentData = async (student: StudentWithPendaftaran) => {
    const zip = new JSZip()
    const namaSiswa = student.nama_lengkap || student.pendaftaran?.nama_siswa || 'Siswa_Tanpa_Nama'
    const folderName = `${namaSiswa.replace(/[^a-z0-9]/gi, '_')}_${student.nis_lokal || 'NoNIS'}`
    const folder = zip.folder(folderName)

    if (!folder) throw new Error('Failed to create zip folder')

    // 1. Create Profile Summary Text
    const profileContent = `
DATA SISWA
=================================
Nama Lengkap    : ${namaSiswa}
NIS Lokal       : ${student.nis_lokal || '-'}
Kelas           : ${student.kelas || '-'}
Status          : ${student.status_aktif ? 'Aktif' : 'Nonaktif'}
Alamat          : ${student.alamat || student.pendaftaran?.alamat_rumah || '-'}

DATA PENDAFTARAN
=================================
Nama Pendaftar  : ${student.pendaftaran?.nama_siswa || '-'}
Tanggal Lahir   : ${student.pendaftaran?.tanggal_lahir || '-'}
Jenis Kelamin   : ${student.pendaftaran?.jenis_kelamin || '-'}
Tanggal Daftar  : ${new Date(student.created_at).toLocaleDateString('id-ID')}
  `.trim()

    folder.file('biodata_siswa.txt', profileContent)

    // 2. Fetch and Add Files
    if (student.pendaftaran?.berkas_siswa && student.pendaftaran.berkas_siswa.length > 0) {
        const filePromises = student.pendaftaran.berkas_siswa.map(async (berkas: any) => {
            try {
                if (!berkas.url_file) return

                const response = await fetch(berkas.url_file)
                if (!response.ok) throw new Error(`Failed to fetch ${berkas.jenis_dokumen}`)

                const blob = await response.blob()
                const extension = berkas.url_file.split('.').pop() || 'jpg'
                const fileName = `${berkas.jenis_dokumen}.${extension}`

                folder.file(fileName, blob)
            } catch (error) {
                console.error(`Error downloading file ${berkas.jenis_dokumen}:`, error)
                folder.file(`ERROR_${berkas.jenis_dokumen}.txt`, `Gagal mengunduh file: ${error}`)
            }
        })

        await Promise.all(filePromises)
    } else {
        folder.file('info_berkas.txt', 'Tidak ada berkas yang dilampirkan.')
    }

    // 3. Generate and Save Zip
    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, `${folderName}.zip`)
}
