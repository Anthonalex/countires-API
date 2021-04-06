const logOutBtn = document.querySelector(".logout-btn");
const searchInput = document.querySelector(".search-input");

searchInput.value = localStorage.getItem("value");

logOutBtn.addEventListener("click", () => {
  window.location.href = "/index.html";
});

searchInput.addEventListener("input", () => {
  localStorage.setItem("value", `${searchInput.value}`);
});
