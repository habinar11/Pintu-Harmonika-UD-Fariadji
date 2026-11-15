# Website Dinamis Pintu Harmonika + Admin CMS Panel

Website modern, responsif, dan dinamis untuk industri/pabrik fabrikasi **Pintu Harmonika (Folding Gate)**. Dilengkapi dengan **Panel Admin (CMS)** mandiri sehingga Anda dapat menambah, mengedit, dan menghapus seluruh konten website tanpa perlu mengubah kode.

---

## 🌟 Fitur Utama Website

1. **Beranda (Homepage)**
   - **Hero Banner:** Headline berdaya tarik tinggi dengan trust indicators (14+ Tahun Pengalaman, 3.500+ Pintu Terpasang, Garansi Resmi 5 Tahun, Bahan 100% SNI).
   - **Kalkulator Simulasi Estimasi Biaya:** Calon pembeli dapat memasukkan lebar & tinggi opening pintu, memilih tipe ketebalan, serta opsi tambahan (roda swing / cat oven 2 warna) yang secara otomatis menghitung total harga estimasi dan tombol chat WhatsApp dengan pesan ukuran yang sudah terisi otomatis!
   - **Keunggulan Utama:** 6 pilar mutu (Plat SNI murni anti banci, Double bearing jepang, Rel tanam as padat, Cat meni epoxy & oven, Garansi servis, Free survey lokasi).
   - **Katalog Unggulan, Galeri Proyek, Testimoni Klien, & Banner Kemitraan Kontraktor.**

2. **Produk (`/produk`)**
   - Katalog lengkap tipe pintu (Ekonomis, Standar, Medium, Super Heavy, Garasi Minimalis).
   - Rincian spesifikasi lengkap: Tebal daun, ukuran plat silangan, tiang UNP, jenis bearing, sistem kunci, finishing cat, dan harga per m².
   - Tombol pesan langsung ke WhatsApp untuk tiap tipe.

3. **Material & Edukasi Bahan (`/material`)**
   - Penjelasan teknis & visual anatomi pintu harmonika: Slat Daun, Plat Silangan, Tiang UNP, Roda Double Bearing, Rel Tanam As, dan Kunci Anti-Linggis.
   - **Edukasi Khusus:** Bahaya penipuan "Plat Banci" dan jaminan pengukuran ketebalan sigmat asli.

4. **List Project / Portofolio (`/project`)**
   - Galeri dokumentasi proyek terpasang dengan tab filter kategori (*Ruko & Komersial, Gudang & Industri, Garasi Rumah, Toko & Pasar*).
   - Detail nama klien, lokasi, tahun pasang, volume unit, dan deskripsi proyek.

5. **Profil Perusahaan (`/profil`)**
   - Sejarah bengkel & dedikasi kualitas, Visi & Misi perusahaan, statistik pencapaian, dan foto workshop perakitan.

6. **Testimoni Klien (`/testimoni`)**
   - Daftar ulasan kepuasan pelanggan dengan rating bintang dan lokasi.
   - Formulir interaktif bagi pelanggan untuk mengirimkan ulasan baru.

7. **Kerja Sama Kemitraan (`/kerjasama`)**
   - Fasilitas kemitraan B2B untuk Kontraktor, Developer Properti, Arsitek, dan Toko Besi/Reseller (Diskon volume proyek, prioritas antrean produksi, proteksi komisi).
   - Formulir pendaftaran mitra / pengajuan penawaran tender resmi.

8. **Kontak & Workshop (`/kontak`)**
   - Alamat lengkap kantor pemasaran & workshop pabrikasi, jam operasional, email, telepon, dan tombol WhatsApp CS.
   - Peta lokasi interaktif (Google Maps embed).
   - Formulir permohonan survey pengukuran gratis ke lokasi bangunan.

9. **Panel Admin / CMS (`/admin`)**
   - Akses aman dengan proteksi login session.
   - **Kelola Produk:** Tambah produk baru, edit spesifikasi & harga m², upload URL foto, dan hapus.
   - **Kelola List Project:** Tambah dokumentasi proyek selesai, edit klien & lokasi, upload foto, dan hapus.
   - **Kelola Material:** Perbarui penjelasan komponen dan keunggulan bahan.
   - **Kelola Testimoni:** Tambah ulasan baru, ubah rating, edit atau hapus.
   - **Pengaturan Profil & Kontak:** Ubah Nama Perusahaan, Slogan, No WhatsApp CS, Alamat, Jam Kerja, dan Teks Beranda sekali klik langsung update di seluruh website.
   - **Kotak Masuk Leads:** Lihat semua pesan permohonan survey lokasi dan pengajuan mitra kerja sama yang masuk dari pengunjung.

---

## 🔑 Kredensial Login Admin

- **URL Admin:** `http://localhost:3000/admin`
- **Username:** `admin`
- **Password:** `admin123` *(atau `harmonika2024`)*

---

## 🚀 Cara Menjalankan Website

### Mode Produksi (Cepat & Stabil):
```bash
npm run start
```
Akses di browser: `http://localhost:3000`

### Mode Pengembangan (Development / Live Reload):
```bash
npm run dev
```

### Build Ulang (Jika Ada Perubahan Kode):
```bash
npm run build
```

---

## 💾 Penyimpanan Data
Seluruh data produk, proyek, testimoni, material, dan pengaturan tersimpan secara aman dan persisten pada file `data/db.json`. Anda juga dapat melakukan backup berkala hanya dengan menyalin file ini.
