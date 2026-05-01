async function loadComponent(id, file) {
  try {
    // detect if inside /pages/
    const isSubPage = window.location.pathname.includes("/pages/");

    // correct base path
    const basePath = isSubPage ? "../" : "./";

    const res = await fetch(`${basePath}components/${file}`);

    if (!res.ok) throw new Error("Component not found");

    const data = await res.text();

    document.getElementById(id).innerHTML = data;

  } catch (error) {
    console.error("Error loading component:", error);
  }
}

loadComponent("header", "header.html");
loadComponent("footer", "footer.html");