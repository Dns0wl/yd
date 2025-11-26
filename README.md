# Hayu Widyas Office Dashboard

Dashboard Next.js 16 (App Router) untuk modul **Manual Paper**. Proyek ini menggunakan Tailwind CSS v4, TypeScript, dan arsitektur komponen yang bersih agar mudah dikembangkan lebih lanjut.

## Teknologi
- Next.js 16 App Router (folder `app/`)
- React 19 + TypeScript
- Tailwind CSS v4 dengan import `@import "tailwindcss";` pada `app/globals.css`
- html2canvas & jsPDF untuk ekspor PDF sisi klien

## Struktur Folder
- `app/`
  - `layout.tsx`: Root layout
  - `page.tsx`: Redirect ke `/manual-paper`
  - `(dashboard)/layout.tsx`: Kerangka sidebar + topbar
  - `(dashboard)/manual-paper/page.tsx`: Halaman Manual Paper
- `components/ui/`: Komponen UI reusable (Button, Card, Modal, Sidebar, Topbar, FormField)
- `features/manualPaper/`: Logika domain Manual Paper (types, store, template A5, form, list, page)

## Menjalankan Proyek
1. Instal dependensi:
   ```bash
   npm install
   ```
2. Jalankan pengembangan:
   ```bash
   npm run dev
   ```
3. Buka `http://localhost:3000`.

> Catatan: Jika registri npm dibatasi, instalasi dapat gagal. Pastikan jaringan dapat mengakses registri publik npm.

## Alur Data Manual Paper
1. Klik **Add New Manual Paper** untuk membuka modal form.
2. Isi nama pelanggan, tanggal pembelian, dan kanal pembelian, lalu klik **Save & Generate**.
3. Record baru disimpan di store klien dan muncul di daftar paling atas.
4. Tombol **Preview** membuka modal berisi komponen `ManualPaperTemplate` dengan data yang baru dimasukkan.
5. Tombol **Download PDF** merender template tersembunyi, menangkapnya dengan html2canvas, lalu menyimpan PDF A5 via jsPDF dengan nama `ManualPaper-{CustomerName}-{YYYYMMDD}.pdf`.

## Mendukung Data Dinamis
- `ManualPaperPage` menerima `initialRecords` opsional sehingga dapat diisi data dari sumber eksternal (mis. API atau database) tanpa perlu mengubah logika UI.
- `useManualPaperStore` menginisialisasi state dari nilai awal tersebut dan menambahkan record baru secara imutabel di klien.
