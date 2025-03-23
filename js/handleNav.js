const currentPath = window.location.pathname;
console.log(currentPath);
const navLinks = document.querySelectorAll(".nav-links li a");

navLinks.forEach((link) => {
  const linkPath = link.getAttribute("href");
  if (currentPath === linkPath) {
    link.classList.add("active");
  }
});
