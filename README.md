# FormBuilder Frontend

Frontend aplikasi Form Builder, dibangun dengan React + Vite dan Tailwind CSS.

## Tech Stack

- React + Vite
- React Router DOM
- Tailwind CSS

## Prerequisites

- Node.js v18+
- npm
- Backend API sudah berjalan (lihat repo backend)

## Instalasi

1. Clone repository
```bash
   git clone https://github.com/KhanyfatulMuflikhat/webdev-form-builder-frontend.git
   cd webdev-form-builder-frontend
```

2. Install dependencies
```bash
   npm install
```

3. Buat file `.env` dari `.env.example`
```bash
   cp .env.example .env
```
   Isi `VITE_API_URL` dengan URL backend (default: `http://localhost:3000`).

4. Jalankan aplikasi
```bash
   npm run dev
```

Aplikasi berjalan di `http://localhost:5173`

## Halaman

- `/login` - Halaman login
- `/register` - Halaman register
- `/forms` - Daftar form milik user
- `/forms/:id` - Detail form, kelola pertanyaan
- `/forms/:id/respond` - Halaman pengisian form untuk responden

## Fitur

- Auth (login, register, logout)
- CRUD Form (buat, lihat, edit, hapus)
- Kelola pertanyaan (short answer, multiple choice, checkbox, dropdown)
- Halaman pengisian form untuk responden
- Loading state dan error handling

## Catatan

Pastikan backend sudah berjalan sebelum menjalankan frontend.
