// ========== Admin Page (Phase 1 - UI Simulation) ==========

const toastEl = document.getElementById("adToast");

function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(window.__adT);
  window.__adT = setTimeout(() => toastEl.classList.remove("show"), 1400);
}

// Logo: stay on same page + scroll top
document.getElementById("logoHome")?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Counts
const reportsBody = document.getElementById("reportsBody");
const blockedBody = document.getElementById("blockedBody");
const reportsCount = document.getElementById("reportsCount");
const blockedCount = document.getElementById("blockedCount");

function refreshCounts(){
  reportsCount.textContent = String(reportsBody?.querySelectorAll("tr").length || 0);
  blockedCount.textContent = String(blockedBody?.querySelectorAll("tr").length || 0);
}

function blockedExists(email){
  const rows = blockedBody?.querySelectorAll("tr") || [];
  for(const r of rows){
    const tds = r.querySelectorAll("td");
    if(tds[1] && tds[1].textContent.trim().toLowerCase() === email.trim().toLowerCase()){
      return true;
    }
  }
  return false;
}

function addBlockedUser(name, email){
  if(blockedExists(email)) return;

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${escapeHtml(name)}</td>
    <td>${escapeHtml(email)}</td>
  `;
  blockedBody.appendChild(tr);
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

// Handle action forms (Submit stays on same page)
document.querySelectorAll('form[data-form="reportAction"]').forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const row = form.closest("tr");
    if(!row) return;

    const picked = form.querySelector('input[type="radio"]:checked');
    if(!picked){
      toast("Pick an action first");
      return;
    }

    // Extract creator name + email from row
    const nameEl = row.querySelector(".ad-user__name");
    const emailEl = row.querySelector(".ad-user__sub");
    const creatorName = nameEl ? nameEl.textContent.trim() : "Unknown";
    const creatorEmail = emailEl ? emailEl.textContent.trim() : "unknown@vibebite.com";

    if(picked.value === "block"){
      addBlockedUser(creatorName, creatorEmail);
      row.remove();
      refreshCounts();
      toast("User blocked (UI only)");
      return;
    }

    if(picked.value === "dismiss"){
      row.remove();
      refreshCounts();
      toast("Report dismissed (UI only)");
      return;
    }
  });
});

// Initial counts
refreshCounts();


