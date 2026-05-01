
function applySavedTheme() {
  const saved = localStorage.getItem("theme");

  if (saved === "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
}

// to Apply  on load
applySavedTheme();

//  Use event toggle theme
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "themeToggle") {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
      localStorage.setItem("theme", "light");
      e.target.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "dark");
      e.target.textContent = "🌙";
    }
  }
});