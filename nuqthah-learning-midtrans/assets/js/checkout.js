document.addEventListener("DOMContentLoaded", () => {
  const orderRaw = localStorage.getItem("nuqthah_order_draft_v1");
  const order = orderRaw ? JSON.parse(orderRaw) : { items: getCart(), total: cartTotal() };

  const tbody = document.getElementById("summaryTbody");
  const totalEl = document.getElementById("summaryTotal");

  function renderSummary(){
    tbody.innerHTML = "";
    (order.items || []).forEach(x => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${x.name}</strong><br><span class="muted small">${x.category || ""}</span></td>
        <td>${x.qty}</td>
        <td>${rupiah(x.price)}</td>
        <td><strong>${rupiah(x.price * x.qty)}</strong></td>
      `;
      tbody.appendChild(tr);
    });
    totalEl.textContent = rupiah(order.total || 0);
  }

  renderSummary();

  const form = document.getElementById("checkoutForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const finalOrder = {
      ...order,
      customer: data,
      currency: "IDR",
      total: order.total || 0,
      order_id: "NQT-" + Date.now()
    };
    localStorage.setItem("nuqthah_order_final_v1", JSON.stringify(finalOrder));
    window.location.href = "payment.html";
  });
});