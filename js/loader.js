async function loadComponent(id, file) {
  const res = await fetch(`components/${file}`);
  const data = await res.text();
  document.getElementById(id).innerHTML = data;
}

loadComponent("header", "header.html");
loadComponent("footer", "footer.html");