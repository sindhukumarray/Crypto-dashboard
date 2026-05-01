const isSubPage = window.location.pathname.includes("/pages/");
const base = isSubPage ? "../" : "";

loadComponent("header", "header.html");
loadComponent("footer", "footer.html");

// Fix links after loading
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelectorAll("a").forEach(link => {
      if (link.getAttribute("href")) {
        link.href = base + link.getAttribute("href");
      }
    });
  }, 100);
});