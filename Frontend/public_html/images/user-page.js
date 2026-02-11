// ===========================
// USER PAGE SCRIPT (PHASE 1)
// ===========================

document.addEventListener("DOMContentLoaded", function () {
 // حساب عدد الوصفات
  const recipeRows = document.querySelectorAll("#allRecipesTable tbody tr");
  const recipeCount = recipeRows.length;
  document.getElementById("recipeCount").textContent = recipeCount;

  // حساب عدد الإعجابات الإجمالي
  let totalLikes = 0;
  recipeRows.forEach(row => {
    const likesCell = row.cells[4]; // الحصول على العمود الذي يحتوي على عدد الإعجابات
    totalLikes += parseInt(likesCell.textContent); // إضافة الإعجاب للعدد الإجمالي
  });
  document.getElementById("totalLikes").textContent = totalLikes;
  /* =========================
     1. Welcome user name
     ========================= */
    const userNameText = document.getElementById("userNameText");
    if (userNameText) {
      userNameText.textContent = "Jwana Alothman "; // static demo
    }

  /* =========================
     2. Like button (UI only)
     ========================= */
  const likeButtons = document.querySelectorAll('[data-action="like"]');

  likeButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      alert("Recipe liked!");
    });
  });

  /* =========================
     3. Favorite button (UI only)
     ========================= */
  const favButtons = document.querySelectorAll('[data-action="fav"]');

  favButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      alert("Added to favorites!");
    });
  });

  /* =========================
     4. Category filter (UI only)
     ========================= */
  const filter = document.getElementById("categoryFilter");
  const rows = document.querySelectorAll("#allRecipesTable tbody tr");

  if (filter) {
    filter.addEventListener("change", function () {
      const selected = this.value;

      rows.forEach(row => {
        if (selected === "all" || row.dataset.category === selected) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  }

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
document.addEventListener("DOMContentLoaded", function () {
  const addRecipeBtn = document.getElementById("addRecipeBtn");

  if (addRecipeBtn) {
    addRecipeBtn.addEventListener("click", function () {
      // عند النقر على الزر، سيتم تحويل المستخدم إلى الصفحة المطلوبة
      window.location.href = "../Lujain/Add recipe.html"; //
    });
  }
});






