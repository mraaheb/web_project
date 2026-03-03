// ===========================
// MY RECIPES PAGE SCRIPT
// ===========================

document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     1. Like counter (static demo)
     ========================= */
  const likeCells = document.querySelectorAll(".likes-count");

  likeCells.forEach(cell => {
    cell.addEventListener("click", function () {
      let count = parseInt(this.textContent);
      count++;
      this.textContent = count;
    });
  });

  /* =========================
     2. Delete button (disabled)
     ========================= */
  const deleteButtons = document.querySelectorAll(".btn-outline");

  deleteButtons.forEach(btn => {
    if (btn.textContent.trim() === "Delete") {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        alert("Delete is not functional in Phase 1.");
      });
    }
  });

 
  /* =========================
     5. Sign out button
     ========================= */
  const signOutBtn = document.getElementById("signOutBtn");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", function () {
      window.location.href = "../Fanar/index.html";
    });
  }

  

});



