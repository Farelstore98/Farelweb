# FAREL STORE PRO — panduan singkat

## Yang sudah tersedia
- Website responsif untuk HP dan laptop.
- Halaman beranda, katalog produk, cara pesan, dan kontak.
- Filter kategori produk.
- Form pesanan yang menyusun pesan WhatsApp.
- Tampilan login/daftar yang menarik (UI demo).
- Nomor WhatsApp dan daftar produk dapat diatur dari file konfigurasi.

## Pengaturan wajib sebelum dipublikasikan
1. Buka `config.js`.
2. Ganti `ISI_NOMOR_WHATSAPP_ADMIN` dengan nomor WhatsApp kamu, format internasional tanpa tanda `+`, spasi, atau angka 0 di depan. Contoh format: `62812xxxxxxxx`.
3. Simpan file.
4. Buka `index.html` untuk uji tampilan atau unggah seluruh isi folder ini ke hosting statis.

## Penting: batasan versi ini
Ini adalah frontend/katalog dengan pemesanan WhatsApp. Login/daftar masih berupa tampilan demo dan tidak membuat akun sungguhan. Belum ada database, akun pelanggan, dashboard admin yang aman, saldo, riwayat transaksi, payment gateway, verifikasi pembayaran otomatis, atau integrasi supplier/top-up. Jangan menerima password atau data sensitif pelanggan melalui versi ini. Untuk mengaktifkan login sungguhan dan fitur transaksi, perlu backend, database, autentikasi aman, dan integrasi pembayaran/supplier.

## Harga
Harga produk ditampilkan sebagai "konfirmasi admin" karena daftar harga supplier dan aturan biaya jasa perlu dipastikan terlebih dahulu. Jangan mengisi harga perkiraan.
