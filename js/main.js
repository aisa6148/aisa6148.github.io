import { initTheme } from "./theme.js";
import { initNav } from "./nav.js";
import { initReveal } from "./reveal.js";
import { initValueDial } from "./valueDial.js";
import { initFlipbook } from "./flipbook.js";

document.getElementById("year").textContent = new Date().getFullYear();

initTheme();
initNav();
initReveal();
initValueDial();
initFlipbook();
