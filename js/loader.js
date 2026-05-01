// async function loadComponent(id, file) {
//   const res = await fetch(`../components/${file}`);
//   const data = await res.text();
//   document.getElementById(id).innerHTML = data;
// }

// loadComponent("header", "header.html");
// loadComponent("footer", "footer.html");

async function loadComponent(id, file) {
  const isSubPage = window.location.pathname.includes("/pages/");
  const basePath = isSubPage ? "../" : "";

  const res = await fetch(`${basePath}components/${file}`);
  const data = await res.text();
  document.getElementById(id).innerHTML = data;
}

loadComponent("header", "header.html");
loadComponent("footer", "footer.html");