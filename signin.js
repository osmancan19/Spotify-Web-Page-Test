let errors = [];
const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn) {
  window.location.href = "https://www.spotify.com/us/";
  localStorage.clear();
}

function validateForm(event) {
  event.preventDefault();
  clearErrors();

  const signin_form = document.forms["signinForm"];
  const email = signin_form["email"].value.trim();
  const password = signin_form["password"].value.trim();
  const rememberMe = signin_form["remember-me"].value.trim();
  //Blank checks
  if (email.length === 0) {
    const error = getErrorMessage(
      "Please enter your username or email address.",
      "email-error"
    );
    signin_form["email"].insertAdjacentElement("afterend", error);
    errors.push(error);
  }
  if (password.length === 0) {
    const error = getErrorMessage(
      "Please enter your password.",
      "password-error"
    );
    signin_form["password"].insertAdjacentElement("afterend", error);
    errors.push(error);
  }

  if (errors.length === 0) {
    if (rememberMe) {
      localStorage.setItem("loggedIn", true);
    }
    window.location.href = "https://www.spotify.com/us/";
  }
}

function clearErrors() {
  errors.map((error) => error.remove());
  errors = [];
}

function getErrorMessage(message, id) {
  const errorMessage = document.createElement("div");
  errorMessage.id = id;
  errorMessage.className = "w-full text-sm text-red-600 rounded relative mt-2";
  errorMessage.innerText = message;
  return errorMessage;
}
