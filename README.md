# FormBuilder Frontend

Frontend aplikasi Form Builder, dibangun dengan React + Vite dan Tailwind CSS.

## Tech Stack

- React + Vite
- React Router DOM
- Tailwind CSS

## Prerequisites

- Node.js v18+
- npm
- Backend API sudah berjalan

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
   Lalu isi `VITE_API_URL` dengan URL backend (default: `http://localhost:3000`).

4. Jalankan aplikasi
```bash
   npm run dev
```

Aplikasi berjalan di `http://localhost:5173`

## Halaman

- `/login` - Halaman login
- `/register` - Halaman register
- `/forms` - Daftar form
- `/forms/:id` - Detail form

## Catatan

Pastikan backend sudah berjalan sebelum menjalankan frontend.
