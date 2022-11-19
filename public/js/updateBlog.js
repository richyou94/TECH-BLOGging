const updateBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#update-title').value.trim();
    const body = document.querySelector('#update-description').value.trim();
    const blogId = document.querySelector('#update-blogId').textContent;

    console.log(title, body, blogId);

    await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: title,
            description: body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.location.replace('/dashboard');
}

document.querySelector('.update-form').addEventListener('submit', updateBlogHandler);
