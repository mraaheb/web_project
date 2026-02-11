document.addEventListener("DOMContentLoaded", function () {

  /* ===== ADD RECIPE: dynamic fields + submit demo ===== */
  var addRecipeForm = document.getElementById("addRecipeForm");
  if (addRecipeForm) {
    var addIngBtn = document.getElementById("addIngredientBtn");
    var addStepBtn = document.getElementById("addStepBtn");
    var ingList = document.getElementById("ingredientsList");
    var stepsList = document.getElementById("stepsList");
    var msgAdd = document.getElementById("addRecipeMsg");

    // ===== FILE VALIDATION FOR ADD RECIPE =====
    var recipePhotoInput = document.getElementById("recipePhoto");
    var recipeVideoInput = document.getElementById("recipeVideoFile");

    // التحقق من صورة الوصفة
    if (recipePhotoInput) {
      recipePhotoInput.addEventListener("change", function(e) {
        var file = e.target.files[0];
        if (file) {
          var validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
          if (!validImageTypes.includes(file.type)) {
            alert("❌ الرجاء اختيار صورة فقط (JPG, PNG, GIF, WEBP)\nPlease select an image file only (JPG, PNG, GIF, WEBP)");
            e.target.value = "";
            return false;
          }
          // التحقق من حجم الملف (أقل من 5MB)
          if (file.size > 5 * 1024 * 1024) {
            alert("❌ حجم الصورة كبير جداً. الرجاء اختيار صورة أقل من 5MB\nImage size is too large. Please select an image less than 5MB");
            e.target.value = "";
            return false;
          }
          console.log("✅ تم اختيار صورة صحيحة:", file.name);
        }
      });
    }

    // التحقق من فيديو الوصفة
    if (recipeVideoInput) {
      recipeVideoInput.addEventListener("change", function(e) {
        var file = e.target.files[0];
        if (file) {
          var validVideoTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-msvideo", "video/x-matroska"];
          if (!validVideoTypes.includes(file.type)) {
            alert("❌ الرجاء اختيار فيديو فقط (MP4, WEBM, OGG, MOV, AVI, MKV)\nPlease select a video file only (MP4, WEBM, OGG, MOV, AVI, MKV)");
            e.target.value = "";
            return false;
          }
          // التحقق من حجم الملف (أقل من 50MB)
          if (file.size > 50 * 1024 * 1024) {
            alert("❌ حجم الفيديو كبير جداً. الرجاء اختيار فيديو أقل من 50MB\nVideo size is too large. Please select a video less than 50MB");
            e.target.value = "";
            return false;
          }
          console.log("✅ تم اختيار فيديو صحيح:", file.name);
        }
      });
    }

    // إضافة مكون جديد (Name + Quantity) مع Label
    if (addIngBtn && ingList) {
      addIngBtn.addEventListener("click", function () {
        var wrapper = document.createElement("div");
        wrapper.className = "ingredient-row";
        
        var fieldDiv = document.createElement("div");
        fieldDiv.className = "ing-field";
        
        var label = document.createElement("label");
        label.textContent = "Ingredient:";
        
        var inputsDiv = document.createElement("div");
        inputsDiv.className = "ing-inputs";
        
        // Name wrapper
        var nameWrapper = document.createElement("div");
        nameWrapper.className = "ing-input-wrapper";
        
        var nameLabel = document.createElement("span");
        nameLabel.className = "input-label";
        nameLabel.textContent = "Name:";
        
        var inpName = document.createElement("input");
        inpName.type = "text";
        inpName.name = "ingredient-name";
        inpName.placeholder = "e.g., Chicken";
        inpName.className = "input";
        inpName.required = true;
        
        nameWrapper.appendChild(nameLabel);
        nameWrapper.appendChild(inpName);
        
        // Quantity wrapper
        var qtyWrapper = document.createElement("div");
        qtyWrapper.className = "ing-input-wrapper";
        
        var qtyLabel = document.createElement("span");
        qtyLabel.className = "input-label";
        qtyLabel.textContent = "Quantity:";
        
        var inpQty = document.createElement("input");
        inpQty.type = "text";
        inpQty.name = "ingredient-quantity";
        inpQty.placeholder = "e.g., 200g";
        inpQty.className = "input";
        inpQty.required = true;
        
        qtyWrapper.appendChild(qtyLabel);
        qtyWrapper.appendChild(inpQty);
        
        inputsDiv.appendChild(nameWrapper);
        inputsDiv.appendChild(qtyWrapper);
        
        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "×";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() { 
          wrapper.remove();
          updateIngredientLabels();
        };
        
        fieldDiv.appendChild(label);
        fieldDiv.appendChild(inputsDiv);
        wrapper.appendChild(fieldDiv);
        wrapper.appendChild(deleteBtn);
        ingList.appendChild(wrapper);
        
        updateIngredientLabels();
      });
    }

    // إضافة خطوة تعليمات جديدة مع Label
    if (addStepBtn && stepsList) {
      addStepBtn.addEventListener("click", function () {
        var wrapper = document.createElement("div");
        wrapper.className = "step-row";
        
        var fieldDiv = document.createElement("div");
        fieldDiv.className = "step-field";
        
        var label = document.createElement("label");
        label.textContent = "Step:";
        
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
        deleteBtn.onclick = function() { 
          wrapper.remove();
          updateStepLabels();
        };
        
        fieldDiv.appendChild(label);
        fieldDiv.appendChild(ta);
        wrapper.appendChild(fieldDiv);
        wrapper.appendChild(deleteBtn);
        stepsList.appendChild(wrapper);
        
        updateStepLabels();
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

    // ربط أزرار الحذف الموجودة مسبقاً
    function attachDeleteHandlers() {
      var ingDeleteBtns = ingList.querySelectorAll(".delete-btn");
      ingDeleteBtns.forEach(function(btn) {
        btn.onclick = function() {
          btn.parentElement.remove();
          updateIngredientLabels();
        };
      });
      
      var stepDeleteBtns = stepsList.querySelectorAll(".delete-btn");
      stepDeleteBtns.forEach(function(btn) {
        btn.onclick = function() {
          btn.parentElement.remove();
          updateStepLabels();
        };
      });
    }
    
    // تشغيل عند تحميل الصفحة
    attachDeleteHandlers();
    updateIngredientLabels();
    updateStepLabels();

    // معالجة إرسال النموذج
    addRecipeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      // التحقق من وجود ingredients و steps
      var ingredients = ingList.querySelectorAll(".ingredient-row");
      var steps = stepsList.querySelectorAll(".step-row");
      
      if (ingredients.length === 0) {
        alert("Please add at least one ingredient!");
        return false;
      }
      
      if (steps.length === 0) {
        alert("Please add at least one instruction step!");
        return false;
      }
      
      // التحقق النهائي من الصورة
      var photoFile = recipePhotoInput.files[0];
      if (!photoFile) {
        alert("❌ الرجاء اختيار صورة للوصفة\nPlease select a recipe photo");
        return false;
      }
      
      if (msgAdd) {
        msgAdd.className = "form-msg show";
        msgAdd.textContent = "Recipe saved successfully (demo). Redirecting...";
      }
      setTimeout(function () {
        window.location.href = "../Jwana/My recipes.html";
      }, 800);
    });
  }

  /* ===== EDIT RECIPE: NO ADD BUTTONS - EDIT ONLY ===== */
  var editRecipeForm = document.getElementById("editRecipeForm");
  if (editRecipeForm) {
    var ingList2 = document.getElementById("editIngredientsList");
    var stepsList2 = document.getElementById("editStepsList");
    var msgEdit = document.getElementById("editRecipeMsg");

    // ===== FILE VALIDATION FOR EDIT RECIPE =====
    var editPhotoInput = document.getElementById("editRecipePhoto");
    var editVideoInput = document.getElementById("editRecipeVideoFile");

    // التحقق من صورة الوصفة في صفحة التعديل
    if (editPhotoInput) {
      editPhotoInput.addEventListener("change", function(e) {
        var file = e.target.files[0];
        if (file) {
          var validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
          if (!validImageTypes.includes(file.type)) {
            alert("❌ الرجاء اختيار صورة فقط (JPG, PNG, GIF, WEBP)\nPlease select an image file only (JPG, PNG, GIF, WEBP)");
            e.target.value = "";
            return false;
          }
          // التحقق من حجم الملف (أقل من 5MB)
          if (file.size > 5 * 1024 * 1024) {
            alert("❌ حجم الصورة كبير جداً. الرجاء اختيار صورة أقل من 5MB\nImage size is too large. Please select an image less than 5MB");
            e.target.value = "";
            return false;
          }
          console.log("✅ تم اختيار صورة صحيحة:", file.name);
        }
      });
    }

    // التحقق من فيديو الوصفة في صفحة التعديل
    if (editVideoInput) {
      editVideoInput.addEventListener("change", function(e) {
        var file = e.target.files[0];
        if (file) {
          var validVideoTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-msvideo", "video/x-matroska"];
          if (!validVideoTypes.includes(file.type)) {
            alert("❌ الرجاء اختيار فيديو فقط (MP4, WEBM, OGG, MOV, AVI, MKV)\nPlease select a video file only (MP4, WEBM, OGG, MOV, AVI, MKV)");
            e.target.value = "";
            return false;
          }
          // التحقق من حجم الملف (أقل من 50MB)
          if (file.size > 50 * 1024 * 1024) {
            alert("❌ حجم الفيديو كبير جداً. الرجاء اختيار فيديو أقل من 50MB\nVideo size is too large. Please select a video less than 50MB");
            e.target.value = "";
            return false;
          }
          console.log("✅ تم اختيار فيديو صحيح:", file.name);
        }
      });
    }

    // NO ADD BUTTONS IN EDIT PAGE - ONLY DELETE FUNCTIONALITY

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

    // ربط أزرار الحذف الموجودة مسبقاً
    function attachEditDeleteHandlers() {
      var ingDeleteBtns = ingList2.querySelectorAll(".delete-btn");
      ingDeleteBtns.forEach(function(btn) {
        btn.onclick = function() {
          btn.parentElement.remove();
          updateEditIngLabels();
        };
      });
      
      var stepDeleteBtns = stepsList2.querySelectorAll(".delete-btn");
      stepDeleteBtns.forEach(function(btn) {
        btn.onclick = function() {
          btn.parentElement.remove();
          updateEditStepLabels();
        };
      });
    }
    
    // تشغيل عند تحميل الصفحة
    attachEditDeleteHandlers();
    updateEditIngLabels();
    updateEditStepLabels();

    // معالجة إرسال النموذج
    editRecipeForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      // التحقق من وجود ingredients و steps
      var ingredients = ingList2.querySelectorAll(".ingredient-row");
      var steps = stepsList2.querySelectorAll(".step-row");
      
      if (ingredients.length === 0) {
        alert("Please add at least one ingredient!");
        return false;
      }
      
      if (steps.length === 0) {
        alert("Please add at least one instruction step!");
        return false;
      }
      
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