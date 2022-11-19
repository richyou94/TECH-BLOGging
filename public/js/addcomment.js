const commentAddHandler = async function(event) {
    event.preventDefault();

    const blogId = document.querySelector('#blogId').textContent;
    const comment = document.querySelector('#comment-text').value;
    
    if (comment) {
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                blogId,
                comment
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        document.location.reload();
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentAddHandler);