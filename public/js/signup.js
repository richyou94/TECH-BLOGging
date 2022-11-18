const signUpHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#signup-username").value.trim();
  const password = document.querySelector("#signup-password").value.trim();
console.log(username);
console.log(password);
  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      header: { 'Content-Type': 'application/json' },
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
