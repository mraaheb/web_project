// ========== View Recipe Interactions (Clean) ==========

const toastEl = document.getElementById("toast");
function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(window.__t);
  window.__t = setTimeout(()=> toastEl.classList.remove("show"), 1400);
}

// Logo: stay on same page + scroll top
document.getElementById("logoHome")?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Favourite toggle (heart red + active style)
const btnFav = document.getElementById("btnFav");
btnFav?.addEventListener("click", () => {
  const pressed = btnFav.getAttribute("aria-pressed") === "true";
  btnFav.setAttribute("aria-pressed", String(!pressed));

  btnFav.classList.toggle("is-active", !pressed);
  btnFav.querySelector(".vr-ic").textContent = pressed ? "♡" : "♥";

  toast(pressed ? "Removed from favourites" : "Added to favourites");
});

// Like toggle + count + active style
const btnLike = document.getElementById("btnLike");
const likeCount = document.getElementById("likeCount");
btnLike?.addEventListener("click", () => {
  const pressed = btnLike.getAttribute("aria-pressed") === "true";
  btnLike.setAttribute("aria-pressed", String(!pressed));

  btnLike.classList.toggle("is-active", !pressed);

  let n = parseInt(likeCount.textContent || "0", 10);
  n = pressed ? Math.max(0, n - 1) : n + 1;
  likeCount.textContent = String(n);

  toast(pressed ? "Like removed" : "Liked!");
});

// Report modal
const reportModal = document.getElementById("reportModal");
const btnReport = document.getElementById("btnReport");
const btnSubmitReport = document.getElementById("btnSubmitReport");

function openReport(){
  reportModal.classList.add("show");
  reportModal.setAttribute("aria-hidden", "false");
}
function closeReport(){
  reportModal.classList.remove("show");
  reportModal.setAttribute("aria-hidden", "true");
}

btnReport?.addEventListener("click", openReport);
reportModal?.addEventListener("click", (e) => {
  const close = e.target?.getAttribute("data-close");
  if(close) closeReport();
});

btnSubmitReport?.addEventListener("click", () => {
  const picked = document.querySelector('input[name="reportReason"]:checked');
  if(!picked){
    toast("Pick a reason first");
    return;
  }
  toast(`Report submitted: ${picked.value}`);
  closeReport();
});

// ===== Comments (add + delete your own) =====
const commentsList = document.getElementById("commentsList");
const commentsCount = document.getElementById("commentsCount");
const commentInput = document.getElementById("commentInput");
const btnAddComment = document.getElementById("btnAddComment");

// Fake logged-in user (Phase 1)
const currentUser = {
  name: "You",
  avatar: "../images/default-user.png"
};

// Dummy initial comments
const initial = [
  { name:"Sara", time:"2h ago", text:"Looks tasty! I’ll try it before studying.", avatar:"../images/person comm2.jpeg", mine:false },
  { name:"Faisal", time:"1h ago", text:"Great idea for energy without sugar crash.", avatar:"../images/person comm1.jpeg", mine:false },
  { name:"Layan", time:"30m ago", text:"Can we replace banana with berries?", avatar:"../images/default-user.png", mine:false },
];

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function renderComment(c){
  const item = document.createElement("div");
  item.className = "vr-comment";

  const left = document.createElement("div");
  left.className = "vr-comment__left";

  left.innerHTML = `
    <img class="vr-comment__av" src="${escapeHtml(c.avatar)}" alt="user avatar">
    <div>
      <div class="vr-comment__name">${escapeHtml(c.name)}</div>
      <div class="vr-comment__time">${escapeHtml(c.time)}</div>
      <div class="vr-comment__text">${escapeHtml(c.text)}</div>
    </div>
  `;

  item.appendChild(left);

  // Delete button only for your comment
  if(c.mine){
    const del = document.createElement("button");
    del.type = "button";
    del.className = "vr-comment__del";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      item.remove();
      setCount();
      toast("Comment deleted");
    });
    item.appendChild(del);
  }

  commentsList.appendChild(item);
}

function setCount(){
  commentsCount.textContent = String(commentsList.children.length);
}

function addComment(text){
  const clean = text.trim();
  if(!clean){
    toast("Write something first");
    return;
  }

  renderComment({
    name: currentUser.name,
    time: "just now",
    text: clean,
    avatar: currentUser.avatar,
    mine: true
  });

  commentInput.value = "";
  setCount();

  // scroll to bottom
  commentsList.scrollTop = commentsList.scrollHeight;

  toast("Comment added");
}

btnAddComment?.addEventListener("click", () => addComment(commentInput.value));

commentInput?.addEventListener("keydown", (e) => {
  if(e.key === "Enter" && !e.shiftKey){
    e.preventDefault();
    addComment(commentInput.value);
  }
});

// init
commentsList.innerHTML = "";
initial.forEach(renderComment);
setCount();
commentsList.scrollTop = commentsList.scrollHeight;

