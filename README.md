# dokumentasi_perpustakaan_digital_berbasis_web

Situs dokumentasi **bisnis** proyek **PustakaDigital** — perpustakaan
digital baca online (branch `optl/rombak-total`, database `optl_pustaka`).

> Repo aplikasi asli: https://github.com/0Zeroiszero/Perpustakaan-berbasis-web
> (repo referensi — tidak diubah oleh proses pembuatan dokumentasi ini)

## Isi

| Halaman | Isi |
| --- | --- |
| `index.html` | Landing: kartu menu dokumentasi + ringkas proyek + akun demo |
| `alur-bisnis.html` | BL-01–BL-09 sebagai animasi langkah + diagram mermaid interaktif |
| `business-rules.html` | BR-01–BR-08, state diagram lifecycle, matriks akses, turunan data, pemetaan verifikasi |
| `erd.html` | ERD mermaid interaktif (7 tabel + VIEW), aturan relasi, penjelasan tabel |
| `sql.html` | 10 blok query SQL asli (VIEW, katalog, rak, upsert, progres, reset, guard, slug, DDL) |
| `live-coding.html` | 8 snippet HTML+PHP+JS tanpa CSS + **expected output** di browser frame |
| `screenshots.html` | 33 screenshot asli `docs/screenshots` dengan filter kelompok + lightbox |
| `tentang.html` | Latar belakang, tujuan, fitur, teknologi, struktur folder, keputusan teknis |
| `spesifikasi.html` | SPEC-DB…SPEC-10 + cara menjalankan `tests/smoke.php` & `tests/viewport.py` |

## Navigasi: slider "Di halaman ini"

Saat kamu menggulir, muncul **slider TOC di tepi kanan** (gaya komponen Table of Contents shadcn/ui):
klik untuk membuka panel daftar isi halaman, setiap butir bisa diklik untuk melompat ke bagian, dan
butir aktif mengikuti posisi scroll (scroll-spy). Di desktop panel terbuka otomatis; di mobile ia
menjadi drawer dengan tombol Tutup/Esc.

## Deploy ke Vercel

1. Push repo ini ke GitHub (atau import langsung dari ZIP).
2. Di [vercel.com](https://vercel.com) → **Add New Project → Import** repo ini.
3. Framework Preset: **Other** (situs statis murni — tanpa build command, tanpa output directory).
4. Deploy. `vercel.json` sudah ada (`cleanUrls`) sehingga `alur-bisnis.html` juga bisa dibuka lewat `/alur-bisnis`.

## Struktur

```
├── index.html … spesifikasi.html   9 halaman statis (dengan slider TOC "Di halaman ini")
├── assets/    style.css · app.js · vendor/ (mermaid 11, highlight.js)
├── docs/screenshots/               33 screenshot asli (disalin dari repo aplikasi)
├── database/for_demo_optl_pustaka.sql  dump demo yang didokumentasikan
└── vercel.json
```

## Sumber

- `docs/Business-Logic-Dan-Business-Rules.pdf` (BR-01–08, BL-01–09, matriks akses, turunan data)
- `README.md`, `docs/RENCANA-ROMBAK-TOTAL.md`, `docs/specs/SPEC-*.md` di repo aplikasi
- `database/for_demo_optl_pustaka.sql` (skema + data demo)
- `docs/screenshots/*.png` (33 tangkapan layar)

Situs ini hanya membaca repo referensi; tidak ada file repo aplikasi yang diubah.
