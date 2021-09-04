const form = document.getElementById("form");
const fName = document.getElementById("fName");
const lName = document.getElementById("lName");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const mob = document.getElementById("phoneNum");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirmPass");
const indicator = document.querySelector(".indicator");
const weak = document.querySelector(".weak");
const medium = document.querySelector(".medium");
const strong = document.querySelector(".strong");

let lower = /(?=.*[a-z])/;
let upper = /(?=.*[A-Z])/;
let num = /(?=.*[0-9])/;

form.addEventListener("submit", (e) => {
  var trigger = validate();
  if (trigger) {
    e.preventDefault();
  }
});

function validate() {
  const fNameValue = fName.value.trim();
  const lNameValue = lName.value.trim();
  const userNameValue = userName.value.trim();
  const emailValue = email.value.trim();
  const mobValue = mob.value.trim();
  const passwordValue = password.value.trim();
  const confirmPassValue = confirmPass.value.trim();

  //   first name check
  if (fNameValue === "") {
    setError(fName, "First Name cannot be blank");
  } else {
    setSuccess(fName);
  }

  //   last name check
  if (lNameValue === "") {
    setError(lName, "Last Name cannot be blank");
  } else {
    setSuccess(lName);
  }

  //   username check
  if (userNameValue === "") {
    setError(userName, "username cannot be blank");
  } else {
    setSuccess(userName);
  }

  checkEmail(emailValue);
  checkMob(mobValue);
  checkPassword(passwordValue);
  confirmPassword(confirmPassValue);

  function confirmPassword(input) {
    if (input === "") {
      setError(confirmPass, "cannot be blank");
    } else if (input != passwordValue) {
      setError(confirmPass, "passwords do not match");
    } else {
      setSuccess(confirmPass);
    }
  }

  function checkPassword(input) {
    if (input === "") {
      setError(password, "password cannot be blank");
    } else if (!lower.test(input) || !upper.test(input)) {
      setError(password, "must include at least one upper&lower case");
    } else if (!num.test(input)) {
      setError(password, "must include at least one number");
    } else if (input.length < 8) {
      setError(password, "password must have at least 8 characters");
    } else {
      setSuccess(password);
    }
  }

  function checkMob(input) {
    var numb = input.replace(/\s/g, "");
    var regexp =
      /^(\d{10})|((\d{3}[\-]){2}\d{4})|((\d{3}[\.]){2}\d{4})|((\d{3}[\ ]){2}\d{4})$/;
    if (input === "") {
      setError(mob, "Mobile Number cannot be blank");
    } else if (regexp.test(input)) {
      setSuccess(mob);
    } else if (numb.length > 10) {
      setError(mob, "Cannot be more than 10 digits");
    } else {
      setError(mob, "Invalid Mobile Number");
    }
  }

  function checkEmail(input) {
    var regexp =
      /^([a-z0-9\.-]{1,64})@([a-z0-9-]{2,200}).([a-z]{2,20})(.[a-z]{2,10})?$/i;
    if (regexp.test(input)) {
      setSuccess(email);
    } else if (input === "") {
      setError(email, "email cannot be blank");
    } else {
      setError(email, "Invalid email");
    }
  }

  function setError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    small.innerText = message;

    formControl.className = "form-control error";
  }

  function setSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }

  // -----------------------------------

  // console.log(fName.classList.contains("error"));
  // console.log(lName.classList.contains("error"));
  // console.log(userName.classList.contains("error"));
  // console.log(email.classList.contains("error"));
  // console.log(mob.classList.contains("error"));
  // console.log(password.classList.contains("error"));
  // console.log(confirmPass.classList.contains("error"));

  if (
    fName.parentElement.classList.contains("error") ||
    lName.parentElement.classList.contains("error") ||
    userName.parentElement.classList.contains("error") ||
    email.parentElement.classList.contains("error") ||
    mob.parentElement.classList.contains("error") ||
    password.parentElement.classList.contains("error") ||
    confirmPass.parentElement.classList.contains("error")
  ) {
    return true;
  } else {
    return false;
  }
}

// password strength bar

function trigger() {
  if (password.value != "") {
    indicator.style.display = "block";
    indicator.style.display = "flex";
    if (
      password.value.length <= 3 &&
      (password.value.match(lower) ||
        password.value.match(upper) ||
        password.value.match(num))
    )
      no = 1;
    if (
      password.value.length >= 6 &&
      ((password.value.match(lower) && password.value.match(upper)) ||
        (password.value.match(upper) && password.value.match(num)) ||
        (password.value.match(lower) && password.value.match(num)))
    )
      no = 2;
    if (
      password.value.length >= 6 &&
      password.value.match(lower) &&
      password.value.match(upper) &&
      password.value.match(num)
    )
      no = 3;
    if (no == 1) {
      weak.classList.add("active");
    }
    if (no == 2) {
      medium.classList.add("active");
    } else {
      medium.classList.remove("active");
    }
    if (no == 3) {
      weak.classList.add("active");
      medium.classList.add("active");
      strong.classList.add("active");
    } else {
      strong.classList.remove("active");
    }
  } else {
    indicator.style.display = "none";
  }
}
