const newBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#newblog-title').value.trim();
    const description = document.querySelector('#newblog-description').value.trim();

    await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({
            name: title,
            description: description,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    document.location.replace('/dashboard');
}

document.querySelector('.newblog-form').addEventListener('submit', newBlogHandler);