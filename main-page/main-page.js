const logOutBtn = document.querySelector(".logout-btn");
const searchInput = document.querySelector(".search-input");
const validationAlert = document.querySelector(".validation-alert");

searchInput.value = localStorage.getItem("value");

const isValidInput = (data) => {
  if (isNaN(+data) || data === " " || data === null) {
    return true;
  }
  return false;
};

logOutBtn.addEventListener("click", () => {
  window.location.href = "/index.html";
});

searchInput.addEventListener("input", (event) => {
  if (isValidInput(event.data)) {
    validationAlert.classList.remove("active");
    localStorage.setItem("value", `${searchInput.value}`);
  } else {
    validationAlert.classList.add("active");
    searchInput.value = localStorage.getItem("value");
  }
});
