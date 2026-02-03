const btn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

btn.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.style.display =
    menu.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", () => {
  menu.style.display = "none";
});
