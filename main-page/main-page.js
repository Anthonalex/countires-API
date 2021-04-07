const logOutBtn = document.querySelector(".logout-btn");
const searchInput = document.querySelector(".search-input");
const validationAlert = document.querySelector(".validation-alert");
const countiresContainer = document.querySelector(".countires-container");

searchInput.value = localStorage.getItem("value");

const isValidInput = (data) => {
  if (isNaN(+data) || data === " " || data === null) {
    return true;
  }
  return false;
};

const renderCountires = (data) => {
  data.forEach((el) => {
    console.log(el);
    let div = document.createElement("div");
    let img = document.createElement("img");
    let countryName = document.createElement("p");
    let favBtn = document.createElement("button");

    favBtn.textContent = "+";
    countryName.textContent = `${el.nativeName}(${el.name})`;

    img.setAttribute("src", `${el.flag}`);
    img.classList.add("flag-img");
    favBtn.classList.add('fav-btn')

    div.append(img, countryName, favBtn);

    div.classList.add("country");
    countiresContainer.append(div);
  });
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
      });
  }
};

logOutBtn.addEventListener("click", () => {
  window.location.href = "/index.html";
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
