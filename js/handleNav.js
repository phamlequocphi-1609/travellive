const currentPath = window.location.pathname;

const navLinks = document.querySelectorAll(".nav-links li a");

navLinks.forEach((link) => {
  const linkPath = link.getAttribute("href");
  if (currentPath === linkPath) {
    link.classList.add("active");
  }
});

if (currentPath.includes("menu.html")) {
  const header = document.querySelector(".header");
  const heroText = document.querySelector(".hero-text h1");
  const ctaButtons = document.querySelector(".cta-buttons");

  header.style.background =
    "url('https://kenh14cdn.com/203336854389633024/2022/5/29/photo-1-1653786925158170035088.jpg') center/cover no-repeat";

  if (heroText) {
    heroText.textContent = "Khám phá thực đơn đặc sắc của chúng tôi!";
  }
  if (ctaButtons) {
    ctaButtons.innerHTML = `
        <a href="/confirm-order.html" class="yes" style="padding: 24px">
          <p><span>Order</span></p>
          <p>Now</p>
        </a>
        <a href="/index.html" class="no" style="padding: 24px">
          <p><span>Back</span></p>
          <p>Home</p>
        </a>
      `;
  }
}
