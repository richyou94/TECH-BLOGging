const signUpHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#signup-username").value.trim();
  const password = document.querySelector("#signup-password").value.trim();

  if (username && password) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      await document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signUpHandler);
