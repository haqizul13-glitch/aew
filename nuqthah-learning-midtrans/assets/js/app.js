/**
 * BCN - Cart utilities (localStorage)
 */
const STORAGE_KEY = "nuqthah_cart_v1";

function rupiah(n){
  try {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);
  } catch(e){
    return "IDR " + (n||0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}

function getCart(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return [];
  try { return JSON.parse(raw) || []; } catch(e){ return []; }
}

function setCart(items){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  updateCartCount();
}

function addToCart(item){
  const cart = getCart();
  const idx = cart.findIndex(x => x.id === item.id);
  if(idx >= 0){
    cart[idx].qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  setCart(cart);
}

function removeFromCart(id){
  const cart = getCart().filter(x => x.id !== id);
  setCart(cart);
}

function updateQty(id, qty){
  const cart = getCart().map(x => x.id === id ? ({...x, qty: Math.max(1, qty)}) : x);
  setCart(cart);
}

function cartTotal(){
  return getCart().reduce((sum, x) => sum + (x.price * x.qty), 0);
}

function updateCartCount(){
  const el = document.getElementById("cartCount");
  const elMobile = document.getElementById("cartCountMobile");
  if(!el && !elMobile) return;
  const count = getCart().reduce((s, x) => s + (x.qty||0), 0);
  if(el) el.textContent = count;
  if(elMobile) elMobile.textContent = count;
}

function toast(msg){
  const existing = document.getElementById("toast");
  if(existing) existing.remove();

  const t = document.createElement("div");
  t.id = "toast";
  t.textContent = msg;
  t.style.position = "fixed";
  t.style.left = "50%";
  t.style.bottom = "18px";
  t.style.transform = "translateX(-50%)";
  t.style.padding = "10px 12px";
  t.style.borderRadius = "14px";
  t.style.background = "rgba(15,27,52,.95)";
  t.style.border = "1px solid rgba(255,255,255,.12)";
  t.style.boxShadow = "0 12px 28px rgba(0,0,0,.35)";
  t.style.color = "white";
  t.style.zIndex = "60";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

// Bind add-to-cart buttons (data-product JSON)
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add-to-cart]");
  if(!btn) return;
  const payload = btn.getAttribute("data-add-to-cart");
  try{
    const item = JSON.parse(payload);
    addToCart(item);
    toast("Ditambahkan ke keranjang");
  }catch(err){
    console.error(err);
  }
});

document.addEventListener("DOMContentLoaded", updateCartCount);