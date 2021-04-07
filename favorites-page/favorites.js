const logOutBtn = document.querySelector(".logout-btn");
const favContainer = document.querySelector(".favorites-container");

logOutBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

const renderFavorites = (storage) => {
  Object.values(localStorage).forEach((value) => {
    if (value.length > localStorage.value.length) {
      let div = document.createElement("div");

      div.classList.add("country", "favorites-container");

      div.innerHTML = `${JSON.parse(value)}`;

      favContainer.append(div);
    }
  });
};

window.addEventListener("click", (event) => {
  if (event.path[0].textContent === "-") {
    event.path[0].classList.remove("added");
    event.path[0].textContent = "+";
    localStorage.removeItem(`${event.path[0].id}`);
  } else if (event.path[0].textContent === "+") {
    event.path[0].classList.add("added");
    event.path[0].textContent = "-";

    localStorage.setItem(
      `${event.path[0].id}`,
      `${JSON.stringify(event.path[1].innerHTML)}`
    );
  }
});

renderFavorites();
