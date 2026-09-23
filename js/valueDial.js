/**
 * The Value Dial — re-ranks work cards live by interpolating each
 * card's relevance/diversity score with the slider's lambda, the
 * same shape as the MMR / MMR-P ranking formula from the research.
 */
export function initValueDial() {
  const grid = document.getElementById("dialGrid");
  const slider = document.getElementById("dialSlider");
  const readout = document.getElementById("dialReadout");
  const filters = document.getElementById("dialFilters");
  if (!grid || !slider || !readout || !filters) return;

  const cards = Array.from(grid.querySelectorAll(".dial-card"));

  const currentLambda = () => parseInt(slider.value, 10) / 100;

  function updateReadout(lambda) {
    const pct = Math.round(lambda * 100);
    if (lambda < 0.35) {
      readout.innerHTML = `Weighted toward <b>relevance</b> (${100 - pct}%) — leading with core PhD research`;
    } else if (lambda > 0.65) {
      readout.innerHTML = `Weighted toward <b>diversity</b> (${pct}%) — surfacing the full breadth of the work`;
    } else {
      readout.innerHTML = `Balanced — relevance ${100 - pct}% / diversity ${pct}%, the MMR-P sweet spot`;
    }
  }

  const visibleCards = () => cards.filter((c) => !c.classList.contains("is-hidden"));

  function flipReorder(sortedCards) {
    const first = new Map(visibleCards().map((c) => [c, c.getBoundingClientRect()]));

    sortedCards.forEach((c) => grid.appendChild(c));

    sortedCards.forEach((c) => {
      const f = first.get(c);
      if (!f) return;
      const l = c.getBoundingClientRect();
      const dx = f.left - l.left;
      const dy = f.top - l.top;
      if (!dx && !dy) return;
      c.style.transition = "none";
      c.style.transform = `translate(${dx}px,${dy}px)`;
      requestAnimationFrame(() => {
        c.style.transition = "transform 520ms cubic-bezier(.2,.8,.2,1)";
        c.style.transform = "";
      });
    });
  }

  function rerank() {
    const lambda = currentLambda();
    updateReadout(lambda);
    const scored = visibleCards()
      .map((c) => ({
        el: c,
        score: (1 - lambda) * parseFloat(c.dataset.relevance) + lambda * parseFloat(c.dataset.diversity),
      }))
      .sort((a, b) => b.score - a.score);
    flipReorder(scored.map((s) => s.el));
  }

  slider.addEventListener("input", rerank);

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    filters.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    cards.forEach((c) => {
      const show = filter === "all" || c.dataset.category === filter;
      c.classList.toggle("is-hidden", !show);
    });
    rerank();
  });

  updateReadout(currentLambda());
  rerank();
}
