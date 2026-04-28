
function applySavedTheme() {
  const saved = localStorage.getItem("theme");

  if (saved === "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
}

// Apply theme immediately on load
applySavedTheme();

// 👇 Use event delegation (IMPORTANT FIX)
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