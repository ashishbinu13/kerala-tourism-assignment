const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
  var trigger = validate();
  if (trigger) {
    e.preventDefault();
  }
});

function validate() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  checkEmail(emailValue);
  checkPassword(passwordValue);

  function checkPassword(input) {
    var lower = /(?=.*[a-z])/;
    var upper = /(?=.*[A-Z])/;
    var num = /(?=.*[0-9])/;

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
    var regexp =
      /^(\d{10})|((\d{3}[\-]){2}\d{4})|((\d{3}[\.]){2}\d{4})|((\d{3}[\ ]){2}\d{4})$/;
    if (input === "") {
      setError(mob, "Mobile Number cannot be blank");
    } else if (regexp.test(input)) {
      setSuccess(mob);
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

  if (
    email.parentElement.classList.contains("error") ||
    password.parentElement.classList.contains("error")
  ) {
    return true;
  } else {
    return false;
  }
}
