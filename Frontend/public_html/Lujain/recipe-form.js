document.addEventListener("DOMContentLoaded", function () {

  var ingredientCounter = 1;
  var stepCounter = 1;

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
        ingredientCounter++;
        
        var wrapper = document.createElement("div");
        wrapper.className = "ingredient-row";
        
        var fieldDiv = document.createElement("div");
        fieldDiv.className = "ing-field";
        
        var label = document.createElement("label");
        label.textContent = "Ingredient " + ingredientCounter + ":";
        
        var inputsDiv = document.createElement("div");
        inputsDiv.className = "ing-inputs";
        
        var inpName = document.createElement("input");
        inpName.type = "text";
        inpName.name = "ingredient-name";
        inpName.placeholder = "Name: [name]";
        inpName.className = "input";
        inpName.required = true;
        
        var inpQty = document.createElement("input");
        inpQty.type = "text";
        inpQty.name = "ingredient-quantity";
        inpQty.placeholder = "Quantity: [quantity]";
        inpQty.className = "input";
        inpQty.required = true;
        
        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "×";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() { 
          wrapper.remove();
          ingredientCounter--;
          updateIngredientLabels();
        };
        
        inputsDiv.appendChild(inpName);
        inputsDiv.appendChild(inpQty);
        fieldDiv.appendChild(label);
        fieldDiv.appendChild(inputsDiv);
        wrapper.appendChild(fieldDiv);
        wrapper.appendChild(deleteBtn);
        ingList.appendChild(wrapper);
      });
    }

    // إضافة خطوة تعليمات جديدة
    if (addStepBtn && stepsList) {
      addStepBtn.addEventListener("click", function () {
        stepCounter++;
        
        var wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.gap = "10px";
        wrapper.style.alignItems = "flex-start";
        
        var fieldDiv = document.createElement("div");
        fieldDiv.className = "step-field";
        fieldDiv.style.flex = "1";
        
        var label = document.createElement("label");
        label.textContent = "Step " + stepCounter + ":";
        
        var ta = document.createElement("textarea");
        ta.name = "step";
        ta.rows = 2;
        ta.placeholder = "[step instruction]";
        ta.className = "input";
        ta.required = true;
        
        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "×";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() { 
          wrapper.remove();
          stepCounter--;
          updateStepLabels();
        };
        
        fieldDiv.appendChild(label);
        fieldDiv.appendChild(ta);
        wrapper.appendChild(fieldDiv);
        wrapper.appendChild(deleteBtn);
        stepsList.appendChild(wrapper);
      });
    }

    function updateIngredientLabels() {
      var labels = ingList.querySelectorAll(".ing-field label");
      labels.forEach(function(label, index) {
        label.textContent = "Ingredient " + (index + 1) + ":";
      });
    }

    function updateStepLabels() {
      var labels = stepsList.querySelectorAll(".step-field label");
      labels.forEach(function(label, index) {
        label.textContent = "Step " + (index + 1) + ":";
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
        window.location.href = "../Jwana/My recipes.html";
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

    var editIngCounter = ingList2 ? ingList2.querySelectorAll(".ingredient-row").length : 2;
    var editStepCounter = stepsList2 ? stepsList2.querySelectorAll(".step-field").length : 2;

    // إضافة مكون جديد
    if (addIngBtn2 && ingList2) {
      addIngBtn2.addEventListener("click", function () {
        editIngCounter++;
        
        var wrapper = document.createElement("div");
        wrapper.className = "ingredient-row";
        
        var fieldDiv = document.createElement("div");
        fieldDiv.className = "ing-field";
        
        var label = document.createElement("label");
        label.textContent = "Ingredient " + editIngCounter + ":";
        
        var inputsDiv = document.createElement("div");
        inputsDiv.className = "ing-inputs";
        
        var inpName = document.createElement("input");
        inpName.type = "text";
        inpName.name = "ingredient-name";
        inpName.placeholder = "Name: [name]";
        inpName.className = "input";
        inpName.required = true;
        
        var inpQty = document.createElement("input");
        inpQty.type = "text";
        inpQty.name = "ingredient-quantity";
        inpQty.placeholder = "Quantity: [quantity]";
        inpQty.className = "input";
        inpQty.required = true;
        
        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "×";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() { 
          wrapper.remove();
          editIngCounter--;
          updateEditIngLabels();
        };
        
        inputsDiv.appendChild(inpName);
        inputsDiv.appendChild(inpQty);
        fieldDiv.appendChild(label);
        fieldDiv.appendChild(inputsDiv);
        wrapper.appendChild(fieldDiv);
        wrapper.appendChild(deleteBtn);
        ingList2.appendChild(wrapper);
      });
    }

    // إضافة خطوة تعليمات جديدة
    if (addStepBtn2 && stepsList2) {
      addStepBtn2.addEventListener("click", function () {
        editStepCounter++;
        
        var wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.gap = "10px";
        wrapper.style.alignItems = "flex-start";
        
        var fieldDiv = document.createElement("div");
        fieldDiv.className = "step-field";
        fieldDiv.style.flex = "1";
        
        var label = document.createElement("label");
        label.textContent = "Step " + editStepCounter + ":";
        
        var ta = document.createElement("textarea");
        ta.name = "step";
        ta.rows = 2;
        ta.placeholder = "[step instruction]";
        ta.className = "input";
        ta.required = true;
        
        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "×";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() { 
          wrapper.remove();
          editStepCounter--;
          updateEditStepLabels();
        };
        
        fieldDiv.appendChild(label);
        fieldDiv.appendChild(ta);
        wrapper.appendChild(fieldDiv);
        wrapper.appendChild(deleteBtn);
        stepsList2.appendChild(wrapper);
      });
    }

    function updateEditIngLabels() {
      var labels = ingList2.querySelectorAll(".ing-field label");
      labels.forEach(function(label, index) {
        label.textContent = "Ingredient " + (index + 1) + ":";
      });
    }

    function updateEditStepLabels() {
      var labels = stepsList2.querySelectorAll(".step-field label");
      labels.forEach(function(label, index) {
        label.textContent = "Step " + (index + 1) + ":";
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
        window.location.href = "../Jwana/My recipes.html";
      }, 800);
    });
  }

  /* ===== SIGN OUT (for both pages) ===== */
  var signOutBtn = document.getElementById("signOutBtn");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.href = "../Fanar/index.html";
    });
  }

});