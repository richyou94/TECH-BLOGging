const commentDeleteHandler = async (event) => {
  event.preventDefault();

  const currentId = document.querySelector("#current-user-id").textContent;
  const commentId = document.querySelector("#comment-user-id").textContent;
  const reqId = event.target.value;

  if (currentId === commentId) {
    await fetch(`/api/comment/${reqId}`, {
      method: "DELETE",
    });
    document.location.reload();
  } else {
    document.querySelector(".delete-message").classList.remove("hidden");
    const addHidden = () => {
      document.querySelector(".delete-message").classList.add("hidden");
    };
    setTimeout(addHidden, 2000);
    return;
  }
};

document
  .querySelector(".comment-container")
  .addEventListener("click", commentDeleteHandler);
