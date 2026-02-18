document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.getElementById("mobileNav");
  const closeBtn = document.querySelector(".mobile-nav-close");

  function openNav() {
    if (!drawer) return;
    drawer.hidden = false;
    drawer.classList.add("open");
    toggle?.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");

    // sync cart count
    const el = document.getElementById("cartCountMobile");
    const el2 = document.getElementById("cartCount");
    if (el && el2) el.textContent = el2.textContent;
  }

  function closeNav() {
    if (!drawer) return;
    drawer.classList.remove("open");
    drawer.hidden = true; // akan bekerja setelah CSS fix di atas
    toggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }

  toggle?.addEventListener("click", () => {
    if (drawer && drawer.hidden) openNav();
    else closeNav();
  });

  closeBtn?.addEventListener("click", closeNav);

  // klik area backdrop untuk tutup
  drawer?.addEventListener("click", (e) => {
    if (e.target === drawer) closeNav();
  });

  // klik link di menu → tutup juga
  drawer?.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeNav();
  });
});
