let errors = [];

function validateForm(event) {
  event.preventDefault();
  clearErrors();
  const signup_form = document.forms["signupForm"];
  const email = signup_form["email"].value.trim();
  const confirm_email = signup_form["confirm-email"].value.trim();
  const password = signup_form["password"].value.trim();
  const profile_name = signup_form["profile-name"].value.trim();
  const month = signup_form["month"].value;
  const day = signup_form["day"].value;
  const year = signup_form["year"].value;
  const gender = signup_form["gender"].value;
  //Blank checks
  if (email.length === 0) {
    const error = getErrorMessage("You need to enter your email.");
    signup_form["email"].insertAdjacentElement("afterend", error);
    errors.push(error);
  }
  if (confirm_email.length === 0) {
    const error = getErrorMessage("You need to confirm your email.");
    signup_form["confirm-email"].insertAdjacentElement("afterend", error);
    errors.push(error);
  }
  if (password.length === 0) {
    const error = getErrorMessage("You need to enter a password.");
    signup_form["password"].insertAdjacentElement("afterend", error);
    errors.push(error);
  }
  if (profile_name.length === 0) {
    const error = getErrorMessage("Enter a name for your profile.");
    signup_form["profile-name"].insertAdjacentElement("afterend", error);
    errors.push(error);
  }
  //Date checks
  if (year.length !== 4 || parseInt(year) < 1900 || isNaN(parseInt(year))) {
    const error = getErrorMessage("Enter a valid year.");
    document
      .getElementById("birthday")
      .insertAdjacentElement("beforeend", error);
    errors.push(error);
  } else if (new Date().getFullYear() - parseInt(year) < 18) {
    const error = getErrorMessage(
      "Sorry, you don't meet Spotify's age requirements."
    );
    document
      .getElementById("birthday")
      .insertAdjacentElement("beforeend", error);
    errors.push(error);
  }
  if (
    day.length === 0 ||
    parseInt(day) < 1 ||
    parseInt(day) > 31 ||
    isNaN(parseInt(day))
  ) {
    const error = getErrorMessage("Enter a valid day of the month.");
    document
      .getElementById("birthday")
      .insertAdjacentElement("beforeend", error);
    errors.push(error);
  }
  if (month.length === 0) {
    const error = getErrorMessage("Select your birth month.");
    document
      .getElementById("birthday")
      .insertAdjacentElement("beforeend", error);
    errors.push(error);
  }
  if (gender.length === 0) {
    const error = getErrorMessage("Select your gender.");
    document
      .getElementById("gender-field")
      .insertAdjacentElement("beforeend", error);
    errors.push(error);
  }
}

function clearErrors() {
  errors.map((error) => error.remove());
  errors = [];
}

function getErrorMessage(message) {
  const errorMessage = document.createElement("div");
  errorMessage.className = "w-full text-sm text-red-600 rounded relative mt-2";
  errorMessage.innerText = message;
  return errorMessage;
}
