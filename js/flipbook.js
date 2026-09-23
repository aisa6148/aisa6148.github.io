/**
 * A simple flip-through gallery. Every card's position (front, peeking
 * behind, or flipped away) is recomputed from its offset from the
 * current index, so advancing is just a state change — CSS transitions
 * handle the animation.
 */
export function initFlipbook() {
  const root = document.getElementById("flipbook");
  if (!root) return;

  const cards = Array.from(root.querySelectorAll(".flip-card"));
  const total = cards.length;
  const counter = document.getElementById("flipCounter");
  const prevBtn = document.getElementById("flipPrev");
  const nextBtn = document.getElementById("flipNext");
  if (!total || !counter || !prevBtn || !nextBtn) return;

  let index = 0;

  function render() {
    cards.forEach((card, i) => {
      const offset = (i - index + total) % total;
      card.style.zIndex = String(total - offset);
      if (offset === 0) {
        card.style.transform = "translate(0,0) scale(1) rotateY(0deg)";
        card.style.opacity = "1";
      } else if (offset === 1) {
        card.style.transform = "translate(10px,10px) scale(0.96) rotateY(0deg)";
        card.style.opacity = "0.75";
      } else if (offset === 2) {
        card.style.transform = "translate(18px,18px) scale(0.92) rotateY(0deg)";
        card.style.opacity = "0.4";
      } else {
        card.style.transform = "translate(18px,18px) scale(0.92) rotateY(-110deg)";
        card.style.opacity = "0";
      }
    });
    counter.textContent = `${index + 1} / ${total}`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % total;
    render();
  });
  prevBtn.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    render();
  });

  render();
}
