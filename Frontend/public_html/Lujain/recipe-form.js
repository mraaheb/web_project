document.addEventListener("DOMContentLoaded", function () {

  /* ===== ADD RECIPE: dynamic fields + submit demo ===== */
  var addRecipeForm = document.getElementById("addRecipeForm");
  if (addRecipeForm) {
    var addIngBtn = document.getElementById("addIngredientBtn");
    var addStepBtn = document.getElementById("addStepBtn");
    var ingList = document.getElementById("ingredientsList");
    var stepsList = document.getElementById("stepsList");
    var msgAdd = document.getElementById("addRecipeMsg");

    // إضافة مكون جديد (Name + Quantity)
    if (addIngBtn && ingList) {
      addIngBtn.addEventListener("click", function () {
        var wrapper = document.createElement("div");
        wrapper.className = "ingredient-row";
        
        var inpName = document.createElement("input");
        inpName.type = "text";
        inpName.name = "ingredient-name";
        inpName.placeholder = "e.g., Chicken";
        inpName.className = "input";
        inpName.required = true;
        
        var inpQty = document.createElement("input");
        inpQty.type = "text";
        inpQty.name = "ingredient-quantity";
        inpQty.placeholder = "e.g., 1 breast";
        inpQty.className = "input";
        inpQty.required = true;
        
        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "×";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() { wrapper.remove(); };
        
        wrapper.appendChild(inpName);
        wrapper.appendChild(inpQty);
        wrapper.appendChild(deleteBtn);
        ingList.appendChild(wrapper);
      });
    }

    // إضافة خطوة تعليمات جديدة
    if (addStepBtn && stepsList) {
      addStepBtn.addEventListener("click", function () {
        var wrapper = document.createElement("div");
        
        var ta = document.createElement("textarea");
        ta.name = "step";
        ta.rows = 2;
        ta.placeholder = "Next step...";
        ta.className = "input";
        ta.required = true;
        
        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "×";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() { wrapper.remove(); };
        
        wrapper.appendChild(ta);
        wrapper.appendChild(deleteBtn);
        stepsList.appendChild(wrapper);
      });
    }

    // معالجة إرسال النموذج
    addRecipeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (msgAdd) {
        msgAdd.className = "form-msg show";
        msgAdd.textContent = "Recipe saved successfully (demo). Redirecting...";
      }
      setTimeout(function () {
        window.location.href = "my-recipes.html";
      }, 800);
    });
  }

  /* ===== EDIT RECIPE: dynamic fields + submit demo ===== */
  var editRecipeForm = document.getElementById("editRecipeForm");
  if (editRecipeForm) {
    var addIngBtn2 = document.getElementById("editAddIngredientBtn");
    var addStepBtn2 = document.getElementById("editAddStepBtn");
    var ingList2 = document.getElementById("editIngredientsList");
    var stepsList2 = document.getElementById("editStepsList");
    var msgEdit = document.getElementById("editRecipeMsg");

    // إضافة مكون جديد (Name + Quantity)
    if (addIngBtn2 && ingList2) {
      addIngBtn2.addEventListener("click", function () {
        var wrapper = document.createElement("div");
        wrapper.className = "ingredient-row";
        
        var inpName = document.createElement("input");
        inpName.type = "text";
        inpName.name = "ingredient-name";
        inpName.placeholder = "e.g., Chicken";
        inpName.className = "input";
        inpName.required = true;
        
        var inpQty = document.createElement("input");
        inpQty.type = "text";
        inpQty.name = "ingredient-quantity";
        inpQty.placeholder = "e.g., 1 breast";
        inpQty.className = "input";
        inpQty.required = true;
        
        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "×";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() { wrapper.remove(); };
        
        wrapper.appendChild(inpName);
        wrapper.appendChild(inpQty);
        wrapper.appendChild(deleteBtn);
        ingList2.appendChild(wrapper);
      });
    }

    // إضافة خطوة تعليمات جديدة
    if (addStepBtn2 && stepsList2) {
      addStepBtn2.addEventListener("click", function () {
        var wrapper = document.createElement("div");
        
        var ta = document.createElement("textarea");
        ta.name = "step";
        ta.rows = 2;
        ta.placeholder = "Next step...";
        ta.className = "input";
        ta.required = true;
        
        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "×";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() { wrapper.remove(); };
        
        wrapper.appendChild(ta);
        wrapper.appendChild(deleteBtn);
        stepsList2.appendChild(wrapper);
      });
    }

    // معالجة إرسال النموذج
    editRecipeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (msgEdit) {
        msgEdit.className = "form-msg show";
        msgEdit.textContent = "Changes saved successfully (demo). Redirecting...";
      }
      setTimeout(function () {
        window.location.href = "my-recipes.html";
      }, 800);
    });
  }

  /* ===== SIGN OUT (for both pages) ===== */
  var signOutBtn = document.getElementById("signOutBtn");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });
  }

});