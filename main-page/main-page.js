const logOutBtn = document.querySelector(".logout-btn");
const searchInput = document.querySelector(".search-input");
const validationAlert = document.querySelector(".validation-alert");
const countiresContainer = document.querySelector(".countires-container");
const notFoundAlert = document.querySelector(".not-found");

searchInput.value = localStorage.getItem("value");

const isValidInput = (data) => {
  if (isNaN(+data) || data === " " || data === null) {
    return true;
  }
  return false;
};

const favBtnEventAdder = (btn) => {
  btn.addEventListener("click", (event) => {
    if (btn.textContent === "+") {
      btn.textContent = "-";
      btn.classList.add("added");
      btn.setAttribute("id", `${event.path[1].id}`);

      localStorage.setItem(
        `${event.path[1].id}`,
        `${JSON.stringify(event.path[1].innerHTML)}`
      );
    } else {
      btn.textContent = "+";
      btn.classList.remove("added");
      localStorage.removeItem(`${event.path[1].id}`);
    }
  });
};

const renderCountires = (data) => {
  if (data.status !== 404) {
    notFoundAlert.classList.remove("active");
    data.forEach((el) => {
      let div = document.createElement("div");
      let img = document.createElement("img");
      let countryName = document.createElement("p");
      let favBtn = document.createElement("button");

      favBtn.textContent = "+";
      countryName.textContent = `${el.nativeName} (${el.name})`;

      div.setAttribute("id", `${el.name}`);
      img.setAttribute("src", `${el.flag}`);
      img.classList.add("flag-img");
      favBtn.classList.add("fav-btn");

      favBtnEventAdder(favBtn);
      div.append(img, countryName, favBtn);

      div.classList.add("country");
      countiresContainer.append(div);
    });
  } else {
    notFoundAlert.classList.add("active");
  }
};

const fetchCountry = () => {
  const baseUrl = "https://restcountries.eu/rest/v2/name/";

  if (searchInput.value) {
    fetch(`${baseUrl}${searchInput.value}`)
      .then((res) => {
        return res.json();
      })
      .then((countries) => {
        renderCountires(countries);
      })
      .catch((error) => {
        alert(error);
      });
  }
};

logOutBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

searchInput.addEventListener("input", (event) => {
  countiresContainer.innerHTML = "";
  if (isValidInput(event.data)) {
    validationAlert.classList.remove("active");
    localStorage.setItem("value", `${searchInput.value}`);
    fetchCountry();
  } else {
    validationAlert.classList.add("active");
    searchInput.value = localStorage.getItem("value");
  }
});

fetchCountry();
