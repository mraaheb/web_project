// MY RECIPES PAGE SCRIPT

document.addEventListener("DOMContentLoaded", function () {

  /* Like counter (static demo)*/
  const likeCells = document.querySelectorAll(".likes-count");

  likeCells.forEach(cell => {
    cell.addEventListener("click", function () {
      let count = parseInt(this.textContent);
      count++;
      this.textContent = count;
    });
  });


  /* Sign out button */
  const signOutBtn = document.getElementById("signOutBtn");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", function () {
      window.location.href = "../Fanar/index.html";
    });
  }

  

});