/* =========================
   VibeBite Interactions
   - Quick Picks Slider (loop, no scroll)
   - Favorite toggle
   - Reveal on scroll
   ========================= */

const track = document.getElementById("pickTrack");
const btnLeft = document.getElementById("picksLeft");
const btnRight = document.getElementById("picksRight");

function getCardWidth() {
  const first = track.querySelector(".pick");
  if (!first) return 0;
  const gap = 16;
  return first.offsetWidth + gap;
}

/* ----- Infinite Loop Slider ----- */
let index = 0;
let baseCards = Array.from(track.querySelectorAll(".pick"));

/* clone cards once for loop */
baseCards.forEach(card => track.appendChild(card.cloneNode(true)));

function moveTo(newIndex, animate = true) {
  const cardW = getCardWidth();
  if (!cardW) return;

  index = newIndex;
  track.style.transition = animate ? "transform .45s cubic-bezier(.2,.8,.2,1)" : "none";
  track.style.transform = `translateX(-${index * cardW}px)`;
}

btnRight?.addEventListener("click", () => {
  moveTo(index + 1, true);

  if (index + 1 >= baseCards.length) {
    setTimeout(() => moveTo(0, false), 460);
  }
});

btnLeft?.addEventListener("click", () => {
  if (index === 0) {
    moveTo(baseCards.length, false);
    setTimeout(() => moveTo(baseCards.length - 1, true), 20);
    return;
  }
  moveTo(index - 1, true);
});

/* keep slider correct on resize */
window.addEventListener("resize", () => moveTo(index, false));



/* ----- Reveal on Scroll ----- */
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.15 });

reveals.forEach((el) => io.observe(el));


















function slide(url, dir){
  document.body.classList.add(dir === "right" ? "exit-right" : "exit-left");
  setTimeout(()=>{
    sessionStorage.setItem("enter", dir);
    window.location.href = url;
  }, 800);
}

document.addEventListener("DOMContentLoaded", ()=>{
  const enter = sessionStorage.getItem("enter");
  if(enter){
    document.body.classList.add(enter === "right" ? "enter-right" : "enter-left");
    sessionStorage.removeItem("enter");
  }

  document.querySelectorAll("[data-slide]").forEach(a=>{
    a.addEventListener("click", e=>{
      e.preventDefault();
      slide(a.getAttribute("href"), a.dataset.slide);
    });
  });
});
