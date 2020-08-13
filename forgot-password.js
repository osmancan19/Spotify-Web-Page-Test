let errorMessage = null;

async function resetPassword() {
  if (errorMessage) {
    errorMessage.remove();
  }
  const email_field = document.getElementById("email");
  if (email_field.value.length === 0) {
    errorMessage = document.createElement("div");
    errorMessage.className = "w-full text-red-600 rounded relative";
    errorMessage.innerText = "This field is required";
    email_field.insertAdjacentElement("afterend", errorMessage);
    return;
  }
  sendEmail(email_field.value);
}

async function sendEmail(email) {
  const button = document.getElementsByTagName("button")[0];
  button.innerText = "LOADING";
  button.disabled = true;
  button.classList.add(["opacity-50", "cursor-not-allowed"]);
  const response = await fetch("http://localhost:3000/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }), // body data type must match "Content-Type" header
  });
  if (response.ok) {
    document.getElementById("reset-info").classList.add("hidden");
    document.getElementById("confirmation-info").classList.remove("hidden");
  } else {
    errorMessage = document.createElement("div");
    errorMessage.className = "w-full text-red-600 rounded relative";
    errorMessage.innerText = "An error occurred while sending the reset link";
    document
      .getElementById("email")
      .insertAdjacentElement("afterend", errorMessage);
  }
  button.innerText = "SEND";
  button.disabled = false;
  button.classList.remove(["opacity-50", "cursor-not-allowed"]);
}
