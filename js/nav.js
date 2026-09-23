const SECTION_IDS = ["believe", "research", "built", "projects", "teaching", "beyond", "contact"];

export function initNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
  });
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => navLinks.classList.remove("mobile-open"));
  });

  const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
  const navAnchors = Array.from(navLinks.querySelectorAll("a"));

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const link = navAnchors.find((a) => a.getAttribute("href") === "#" + entry.target.id);
        if (!link) return;
        navAnchors.forEach((a) => a.classList.remove("active"));
        link.classList.add("active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}
