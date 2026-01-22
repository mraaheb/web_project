

/* HOME: Quick Picks Slider*/
(() => {
  const track = document.getElementById("pickTrack");
  const btnLeft = document.getElementById("picksLeft");
  const btnRight = document.getElementById("picksRight");

  if (!track || !btnLeft || !btnRight) return;

  const isRTL =
    getComputedStyle(document.documentElement).direction === "rtl" ||
    getComputedStyle(track).direction === "rtl";

  function getCardWidth() {
    const first = track.querySelector(".pick");
    if (!first) return 0;
    const gap = 16;
    return first.offsetWidth + gap;
  }

  let index = 0;
  const baseCards = Array.from(track.querySelectorAll(".pick"));
  if (!baseCards.length) return;

  // clone once for looping
  baseCards.forEach(card => track.appendChild(card.cloneNode(true)));

  function moveTo(newIndex, animate = true) {
    const cardW = getCardWidth();
    if (!cardW) return;

    index = newIndex;
    track.style.transition = animate
      ? "transform .45s cubic-bezier(.2,.8,.2,1)"
      : "none";

    const distance = index * cardW;
    track.style.transform = isRTL
      ? `translateX(${distance}px)`
      : `translateX(-${distance}px)`;
  }

  btnRight.addEventListener("click", () => {
    moveTo(index + 1, true);
    if (index + 1 >= baseCards.length) {
      setTimeout(() => moveTo(0, false), 460);
    }
  });

  btnLeft.addEventListener("click", () => {
    if (index === 0) {
      moveTo(baseCards.length, false);
      setTimeout(() => moveTo(baseCards.length - 1, true), 20);
      return;
    }
    moveTo(index - 1, true);
  });

  window.addEventListener("resize", () => moveTo(index, false));
  moveTo(0, false);
})();

/* Reveal on Scroll */
(() => {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => io.observe(el));
})();

/*SIGNUP Image-only upload*/
(() => {
  const form = document.getElementById("signupForm");
  if (!form) return;

  const imgInput = document.getElementById("profileImg");

  function isImage(file) {
    return file && file.type && file.type.startsWith("image/");
  }

  form.addEventListener("submit", (e) => {
    const file = imgInput?.files?.[0];
    if (file && !isImage(file)) {
      e.preventDefault();
      alert("Forms accept only image files to upload.");
      imgInput.value = "";
    }
  });
})();
