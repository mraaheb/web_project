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


  // =========================
  // Delete Button
  // =========================
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach(btn => {
    btn.addEventListener("click", function () {

      // إعادة تحميل نفس الصفحة بدون أي رسالة
      window.location.reload();

    });
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