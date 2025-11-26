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
  
- `features/manualPaper/`: Logika domain Manual Paper (types, store, template A5, form, list, page)

## Menjalankan Proyek
1. Instal dependensi utama (Next 16, React 19, Tailwind v4, html2canvas, jsPDF, date-fns):
   ```bash
   npm install
   ```
   - Jika berada di jaringan perusahaan/proxy dan muncul error seperti `403 Forbidden` saat mengambil paket (contoh `@types/node` atau `date-fns`), pastikan registri npm dapat diakses atau setel registri internal yang diizinkan, lalu jalankan kembali `npm install`.
   - Error `Module not found: Can't resolve 'date-fns'` biasanya muncul karena instalasi tidak selesai. Mengulang `npm install` hingga sukses akan menarik dependensi tersebut.
2. Jalankan pengembangan:
   ```bash
   npm run dev
   ```
3. Buka `http://localhost:3000`.

### Catatan Ekspor PDF & Warna
- Pipeline ekspor menggunakan html2canvas + jsPDF dalam format A5. Seluruh warna dari Tailwind (oklch/oklab/display-p3/lab)
  dikonversi otomatis ke RGB saat proses kloning DOM sehingga tidak ada lagi error `lab()` dan hasil PDF tidak transparan/putih.
- Jika ingin mengganti palet warna, pastikan nilai CSS menggunakan format yang didukung (`rgb/rgba/hex`) atau biarkan konversi
  otomatis menangani format modern.

## Alur Data Manual Paper
1. Klik **Add New Manual Paper** untuk membuka modal form.
2. Isi nama pelanggan, tanggal pembelian, dan kanal pembelian, lalu klik **Save & Generate**.
3. Record baru disimpan di store klien dan muncul di daftar paling atas.
4. Tombol **Preview** membuka modal berisi komponen `ManualPaperTemplate` dengan data yang baru dimasukkan.
5. Tombol **Download PDF** merender template tersembunyi, menangkapnya dengan html2canvas, lalu menyimpan PDF A5 via jsPDF dengan nama `ManualPaper-{CustomerName}-{YYYYMMDD}.pdf`.

## Mendukung Data Dinamis
- `ManualPaperPage` menerima `initialRecords` opsional sehingga dapat diisi data dari sumber eksternal (mis. API atau database) tanpa perlu mengubah logika UI.
- `useManualPaperStore` menginisialisasi state dari nilai awal tersebut dan menambahkan record baru secara imutabel di klien.
