# Kids Learning

Web belajar anak (Hewan, Hitungan, Menebak Warna) mengikuti desain Figma.

## Struktur
- `index.html` (layar pembuka), `beranda.html`, `hewan.html`, `hitungan.html`, `warna.html`, `kuis.html`: halaman (HTML)
- `css/`: `base.css` (umum) + satu file CSS per fitur
- `js/`: `core.js` (suara, gambar, topbar) + satu file JS per fitur, data di `js/data/`
- `assets/images/`, `assets/audio/`: tempat gambar dan suara

## Memasang gambar dan suara (opsional)
Kalau file belum ada, gambar diganti emoji dan suara dibacakan oleh suara HP.
- Gambar beranda (sudah terpasang, bisa diganti): `assets/images/home-hewan.jpg`, `home-hitungan.jpg`, `home-warna.jpg`
- Foto hewan (sudah terpasang): `assets/images/hewan/<nama>.jpg`
- Suara hewan: `assets/audio/hewan/<nama>.mp3` (sudah terpasang untuk 10 hewan); angka: `assets/audio/hitungan/1.mp3` ... `12.mp3`; warna: `assets/audio/warna/<nama>.mp3`

## Membuka di HP
- Di laptop: `python -m http.server 8000` di folder ini, lalu buka `http://IP-LAPTOP:8000` dari HP (satu Wi-Fi)
- Atau upload folder ini ke Netlify / GitHub Pages lalu buka link-nya di HP

## Memperbaiki pasangan suara hewan
Buka `cek-suara.html`, dengarkan tiap suara, pilih hewannya, unduh `suara.js`, lalu timpa `js/data/suara.js`.

## Layar pembuka
- Lagu berputar di layar pembuka dan berhenti saat tombol "Mulai Main!" ditekan
- Lagu: taruh di `assets/audio/lagu-pembuka.mp3` (kalau belum ada, diputar nada sederhana)
- Gambar bintang: `assets/images/bintang.png` (kalau belum ada, tampil emoji bintang)
