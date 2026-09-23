const STORAGE_KEY = "aisa-theme";

const MOON_PATH = '<path d="M21 12.5A9 9 0 1 1 11.5 3a7 7 0 0 0 9.5 9.5Z"/>';
const SUN_PATH = '<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/>';

// "light" = off-white, "deep" = near-black navy — see css/tokens.css.
function applyTheme(theme, iconEl) {
  document.documentElement.setAttribute("data-theme", theme);
  iconEl.innerHTML = theme === "deep" ? SUN_PATH : MOON_PATH;
}

export function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIconMoon");
  if (!toggle || !icon) return;

  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  applyTheme(saved === "deep" ? "deep" : "light", icon);

  toggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "deep" ? "light" : "deep";
    applyTheme(next, icon);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
  });
}
