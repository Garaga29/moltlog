const btn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

btn.onclick = (e) => {
  e.stopPropagation();
  menu.style.display = menu.style.display === "block" ? "none" : "block";
};

document.body.onclick = () => {
  menu.style.display = "none";
};
