# Nuqthah Learning — Demo Website (Midtrans Verification)

Website ini dibuat agar konten dan susunannya *mirip* dengan website referensi (bimbel muqarrar berbasis e-learning),
namun tetap menjaga kebutuhan verifikasi Midtrans:

- Produk/jasa jelas + bisa dipesan (katalog maddah)
- Harga/transaksi menggunakan Rupiah (IDR)
- Ada checkout + halaman pembayaran di domain yang sama (tanpa redirect)
- Ada S&K + Kebijakan Pengembalian
- Ada kontak bisnis

## Halaman
- `index.html` — Landing (hero, fitur, testimoni, FAQ)
- `courses.html` — Katalog maddah/paket
- `private-class.html` — Kelas privat (Zoom, 1–3 peserta)
- `cart.html` — Keranjang
- `checkout.html` — Checkout
- `payment.html` — Pembayaran (simulasi, no redirect)
- `terms.html` — Syarat & ketentuan
- `refund.html` — Kebijakan pengembalian
- `contact.html` — Kontak

## Menjalankan
```bash
python -m http.server 8000
```
Buka: `http://localhost:8000`