// USER PAGE SCRIPT

document.addEventListener("DOMContentLoaded", function () {

  // Count Recipes 
  const recipeRows = document.querySelectorAll("#allRecipesTable tbody tr");
  document.getElementById("recipeCount").textContent = recipeRows.length;

  // Count Total Likes
  let totalLikes = 0;
  recipeRows.forEach(row => {
    const likesCell = row.cells[4];
    totalLikes += parseInt(likesCell.textContent);
  });
  document.getElementById("totalLikes").textContent = totalLikes;

  // Welcome Name
  const userNameText = document.getElementById("userNameText");
  if (userNameText) {
    userNameText.textContent = "Jwana Alothman";
  }

  // Sign Out
  const signOutBtn = document.getElementById("signOutBtn");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", function () {
      window.location.href = "../Fanar/index.html";
    });
  }

  // Add Recipe Button
  const addRecipeBtn = document.getElementById("addRecipeBtn");
  if (addRecipeBtn) {
    addRecipeBtn.addEventListener("click", function () {
      window.location.href = "../Lujain/Add recipe.html";
    });
  }

});

// Remove Favorite Button
const removeButtons = document.querySelectorAll(".remove-btn");

removeButtons.forEach(btn => {
  btn.addEventListener("click", function () {

    // يرجع لنفس صفحة اليوزر بدون أي رسالة
    window.location.reload();

  });
});


// FILTER FUNCTION 
function applyFilter() {

  const selectedCategory = document
    .getElementById("categoryFilter")
    .value
    .toLowerCase();

  const rows = document.querySelectorAll("#allRecipesTable tbody tr");

  rows.forEach(row => {

    const rowCategory = row
      .getAttribute("data-category")
      .toLowerCase();

    if (selectedCategory === "all" || rowCategory === selectedCategory) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }

  });

}