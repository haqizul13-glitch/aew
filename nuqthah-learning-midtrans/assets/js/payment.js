document.addEventListener("DOMContentLoaded", () => {
  const raw = localStorage.getItem("nuqthah_order_final_v1");
  const order = raw ? JSON.parse(raw) : null;

  const holder = document.getElementById("payHolder");
  if(!order){
    holder.innerHTML = `<div class="notice">Order belum tersedia. Silakan kembali ke <a href="cart.html">keranjang</a>.</div>`;
    return;
  }

  document.getElementById("orderId").textContent = order.order_id;
  document.getElementById("orderTotal").textContent = rupiah(order.total);
  document.getElementById("orderCurrency").textContent = order.currency || "IDR";

  const tbody = document.getElementById("payTbody");
  tbody.innerHTML = "";
  order.items.forEach(x => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${x.name}</strong><br><span class="muted small">${x.category || ""}</span></td>
      <td>${x.qty}</td>
      <td><strong>${rupiah(x.price * x.qty)}</strong></td>
    `;
    tbody.appendChild(tr);
  });

  // Payment simulation: keep user on the same website (no redirect)
  const payForm = document.getElementById("payForm");
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");
  const closeBtns = document.querySelectorAll("[data-close-modal]");

  closeBtns.forEach(b => b.addEventListener("click", () => modal.classList.remove("open")));

  payForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const method = new FormData(payForm).get("method") || "VA_BCA";
    const methodLabel = document.querySelector(`input[name="method"][value="${method}"]`)?.dataset?.label || method;

    // Create "payment reference" as example
    const ref = "PAY-" + Math.random().toString(16).slice(2, 10).toUpperCase();
    const paidAt = new Date().toISOString();

    modalBody.innerHTML = `
      <div class="notice">
        <strong>Pembayaran diproses (simulasi)</strong><br>
        Metode: <strong>${methodLabel}</strong><br>
        Referensi: <strong>${ref}</strong><br>
        Total: <strong>${rupiah(order.total)} (${order.currency})</strong><br>
        Waktu: <span class="muted small">${paidAt}</span>
      </div>
      <div class="hr"></div>
      <p class="muted small">
        Catatan untuk verifikasi: halaman pembayaran ini berada di domain yang sama dan tidak mengarahkan pengguna ke situs lain.
        Untuk integrasi Midtrans asli, ganti bagian simulasi ini dengan Snap/Client Key sesuai dokumentasi Midtrans.
      </p>
      <div class="inline right">
        <a class="btn btn-secondary" href="index.html">Kembali ke Beranda</a>
        <button class="btn btn-primary" data-close-modal type="button">Tutup</button>
      </div>
    `;
    modal.classList.add("open");

    // Clear cart after "payment"
    setCart([]);
    localStorage.removeItem("nuqthah_order_draft_v1");
    // Keep final order for reference (optional)
  });

  // Close modal when clicking backdrop
  modal.addEventListener("click", (e) => {
    if(e.target === modal) modal.classList.remove("open");
  });
});