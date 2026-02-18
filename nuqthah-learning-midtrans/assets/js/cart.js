document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("cartTbody");
  const totalEl = document.getElementById("cartTotal");
  const emptyEl = document.getElementById("cartEmpty");
  const checkoutBtn = document.getElementById("goCheckout");

  function render(){
    const cart = getCart();
    tbody.innerHTML = "";

    if(cart.length === 0){
      emptyEl.style.display = "block";
      checkoutBtn.setAttribute("disabled", "disabled");
      checkoutBtn.classList.add("btn-disabled");
    } else {
      emptyEl.style.display = "none";
      checkoutBtn.removeAttribute("disabled");
      checkoutBtn.classList.remove("btn-disabled");
    }

    cart.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <strong>${item.name}</strong><br>
          <span class="muted small">${item.category || ""}</span>
        </td>
        <td>${rupiah(item.price)}</td>
        <td>
          <div class="inline">
            <button class="btn btn-secondary small" data-dec="${item.id}">-</button>
            <span class="pill">${item.qty}</span>
            <button class="btn btn-secondary small" data-inc="${item.id}">+</button>
          </div>
        </td>
        <td><strong>${rupiah(item.price * item.qty)}</strong></td>
        <td><button class="btn btn-secondary small" data-remove="${item.id}">Hapus</button></td>
      `;
      tbody.appendChild(tr);
    });

    totalEl.textContent = rupiah(cartTotal());
  }

  document.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    const rem = e.target.closest("[data-remove]");
    if(inc){
      const id = inc.getAttribute("data-inc");
      const item = getCart().find(x => x.id === id);
      if(item) updateQty(id, item.qty + 1);
      render();
    }
    if(dec){
      const id = dec.getAttribute("data-dec");
      const item = getCart().find(x => x.id === id);
      if(item) updateQty(id, Math.max(1, item.qty - 1));
      render();
    }
    if(rem){
      removeFromCart(rem.getAttribute("data-remove"));
      render();
    }
  });

  checkoutBtn.addEventListener("click", () => {
    // Simpan snapshot ringkas untuk checkout
    const order = {
      items: getCart(),
      total: cartTotal(),
      created_at: new Date().toISOString()
    };
    localStorage.setItem("nuqthah_order_draft_v1", JSON.stringify(order));
    window.location.href = "checkout.html";
  });

  render();
});