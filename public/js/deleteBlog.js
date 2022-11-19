const deleteBlogHandler = async (event) => {
    const reqId = event.target.value;

  await fetch(`/api/blogs/${reqId}`, {
    method: "DELETE",
  });

  document.location.reload();
};

document
  .querySelector(".dashboard-container")
  .addEventListener("click", deleteBlogHandler);
