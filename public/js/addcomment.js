const commentAddHandler = async (event) => {
    event.preventDefault();

    const blogId = document.querySelector('#blogId').textContent;
    const comment = document.querySelector('#comment-text').value.trim();
    
    if (comment) {
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                body: comment,
                blog_id: blogId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        document.location.reload();
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentAddHandler);