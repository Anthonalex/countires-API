const userNameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");
const userNameAlertBox = document.querySelector(".username-alert");
const passwordAlertBox = document.querySelector(".password-alert");
const loginBtn = document.querySelector('.login-btn')

const loginBtnStatus = {
  usernameIsValid: false,
  passwordIsValid: false,
};

const enableLoginBtn = (status) => {
  if(status.usernameIsValid && status.passwordIsValid){
    loginBtn.removeAttribute('disabled')
  } else {
    loginBtn.setAttribute('disabled')
  }
}

const isValid = (textData) => {
  if (textData.trim().length >= 5) {
    return true;
  }
  return false;
};

userNameInput.addEventListener("input", () => {
  if (isValid(userNameInput.value)) {
    loginBtnStatus.usernameIsValid = true;
    userNameAlertBox.classList.remove("active");
  } else {
    userNameAlertBox.classList.add("active");
  }
});

passwordInput.addEventListener("input", () => {
  if (isValid(passwordInput.value)) {
    loginBtnStatus.passwordIsValid = true;
    passwordAlertBox.classList.remove("active");
    enableLoginBtn(loginBtnStatus) 
  } else {
    passwordAlertBox.classList.add("active");
  }
});
