---
title: Amankah Mengunggah Paspor atau KTP ke Situs PDF?
description: Sebelum mengunggah scan paspor atau KTP ke situs PDF gratis, baca ini. Risiko sebenarnya, apa yang perlu dicek, dan cara yang lebih aman.
date: 2026-11-19
tools: [passport-id-composer, encrypt-pdf, redact-pdf]
---

Buka rekening bank, mulai kerja baru, sewa kos, mengurus visa: cepat atau lambat ada yang meminta "salinan KTP, depan dan belakang, dalam satu halaman, format PDF." Anda memotret kartunya, mencari alat PDF online gratis, mengunggah kedua foto, lalu mengunduh hasilnya.

Itu hal yang sangat wajar. Namun salinan dokumen identitas adalah salah satu hal paling berharga yang pernah Anda kirim lewat internet. Ada baiknya tahu ke mana gambar itu pergi.

## Apa yang terjadi saat Anda mengunggah identitas ke situs PDF

Kebanyakan alat PDF online memproses file di server mereka sendiri:

1. **Gambar dikirim ke server layanan**, sering kali di negara lain.
2. **Disimpan di sana selama PDF dibuat**, dan sering juga sesudahnya. Ada yang menyimpan satu jam, ada yang sehari atau lebih.
3. **Salinannya bisa masuk ke cadangan dan log** yang tidak pernah Anda lihat.

Sebagian besar layanan dikelola dengan bertanggung jawab. Tetapi setiap tempat penyimpanan KTP Anda adalah satu tempat lagi yang bisa bocor, lewat peretasan, penyimpanan yang salah konfigurasi, atau karyawan dengan akses berlebihan. Dan tidak seperti kata sandi, Anda tidak bisa mengganti NIK atau wajah Anda.

## Kenapa salinan identitas yang bocor berbahaya

Scan identitas yang jelas memuat semua yang dibutuhkan penipu untuk berpura-pura menjadi Anda: nama lengkap, tanggal lahir, foto, nomor dokumen, dan sering kali alamat serta tanda tangan. Dengan itu, pelaku bisa mencoba mengajukan pinjaman online atas nama Anda, melewati verifikasi "unggah KTP" di aplikasi, mendaftarkan nomor HP, atau menyewa properti. Anda mungkin baru tahu saat penagih utang menelepon.

## Lima pertanyaan sebelum mengunggah apa pun

1. **Apakah file diproses di perangkat saya atau di server mereka?** Jika tidak jelas, anggap saja diunggah.
2. **Berapa lama mereka menyimpannya?** "Dihapus setelah satu jam" lebih baik daripada diam, tetapi "tidak pernah diunggah" jauh lebih baik.
3. **Siapa pengelola situsnya?** Adakah nama perusahaan, kebijakan privasi, dan kontak?
4. **Perlu akun?** Mendaftar menghubungkan KTP Anda dengan alamat email Anda di sistem mereka.
5. **Bisakah saya memeriksa cara kerjanya?** Kode alat open-source bisa diperiksa siapa saja.

## Cara lebih aman: siapkan salinan identitas di browser

Anda tidak perlu mengunggah apa pun untuk menaruh kedua sisi KTP dalam satu halaman. [ID Composer dari PDFCharger](/id/tools/passport-id-composer/) melakukannya di dalam browser, jadi gambar tidak pernah keluar dari perangkat Anda:

1. **Foto bagian depan dan belakang kartu** dengan jelas, cahaya cukup, tanpa pantulan. Potong setiap foto pas di tepi kartu.
2. **Buka [ID Composer](/id/tools/passport-id-composer/)** dan tambahkan kedua gambar. JPG, PNG, dan PDF bisa dipakai.
3. **Tambahkan watermark** (lihat di bawah).
4. **Buat PDF dan unduh.** Hasilnya satu halaman A4 dengan sisi depan di atas dan belakang di bawah, masing-masing seukuran kartu identitas standar (85,6 × 54 mm), sehingga hasil cetaknya juga pas.

## Selalu beri watermark pada salinan identitas

Watermark adalah cara paling sederhana agar salinan yang dicuri jauh kurang berguna. Tulis salinan itu *untuk siapa*, *untuk apa*, dan *kapan*, misalnya:

> Copy for bank account opening only - 19/11/2026

Jika salinan itu muncul di tempat lain, jelas telah disalahgunakan. ID Composer mengulang teks Anda secara diagonal di seluruh halaman dengan transparansi rendah (15%), jadi semua bagian tertutup tetapi data tetap terbaca.

Buat teksnya singkat, dan gunakan huruf Latin biasa serta angka.

## Bagikan hanya yang diperlukan

- **Tanyakan apakah perlu kedua sisi.** Kadang hanya sisi foto yang diminta.
- **Tutup yang tidak diperlukan.** Jika lembaga memastikan suatu data tidak dibutuhkan, hapus dengan benar menggunakan [Sensor PDF](/id/tools/redact-pdf/), bukan sekadar ditutup kotak hitam. Beberapa lembaga, terutama bank, wajib melihat dokumen lengkap, jadi tanyakan dulu.
- **Beri kata sandi sebelum mengirim lewat email.** [Enkripsi PDF](/id/tools/encrypt-pdf/) menambahkan enkripsi AES 256-bit di browser. Kirim kata sandinya lewat jalur lain, misalnya SMS atau telepon, jangan di email yang sama.

## Bersihkan setelahnya

Salinan KTP Anda kini mungkin ada di banyak tempat: galeri HP dan cadangan cloud-nya, folder Unduhan, folder Terkirim di email, dan aplikasi chat yang Anda pakai. Hapus salinan yang tidak perlu setelah urusan selesai. Makin sedikit salinan, makin kecil risiko bocor.

## Ringkasnya

- Buat salinan identitas di browser dengan [ID Composer](/id/tools/passport-id-composer/), tanpa unggah.
- Beri watermark: untuk siapa, untuk apa, dan tanggalnya.
- Bagikan hanya yang perlu, dan lindungi file dengan kata sandi.
- Hapus salinan yang tercecer setelah selesai.
