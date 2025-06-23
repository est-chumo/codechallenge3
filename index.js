const postListDiv = document.getElementById("post-list")
const postDetailDiv = document.getElementById("post-detail")
const form = document.getElementById("new-post-form")

function displayPosts() {
    fetch("http://localhost:3000/posts")
    .then(function(res) {
        return res.json()
    })
    .then(function(posts) {
        postListDiv.innerHTML = "" // clear previous
        posts.forEach(function(post) {
            let postItem = document.createElement("div")
            postItem.textContent = post.title
            postItem.style.cursor = "pointer"
            postItem.addEventListener("click", function() {
                handlePostClick(post.id)
            })
            postListDiv.appendChild(postItem)
        })

        // show first post right away
        if (posts.length > 0) {
            handlePostClick(posts[0].id)
        }
    })
}

function handlePostClick(postId) {
    fetch(`http://localhost:3000/posts/${postId}`)
    .then(function(res) {
        return res.json()
    })
    .then(function(post) {
        postDetailDiv.innerHTML = ""
        let title = document.createElement("h2")
        let author = document.createElement("p")
        let content = document.createElement("p")

        title.textContent = post.title
        author.textContent = "By: " + post.author
        content.textContent = post.content

        postDetailDiv.appendChild(title)
        postDetailDiv.appendChild(author)
        postDetailDiv.appendChild(content)
    })
}

function addNewPostListener() {
    form.addEventListener("submit", function(e) {
        e.preventDefault()

        let newTitle = document.getElementById("new-title").value
        let newAuthor = document.getElementById("new-author").value
        let newContent = document.getElementById("new-content").value

        let newPost = {
            title: newTitle,
            author: newAuthor,
            content: newContent
        }

        // Update DOM only, not server
        let postItem = document.createElement("div")
        postItem.textContent = newTitle
        postItem.style.cursor = "pointer"
        postItem.addEventListener("click", function() {
            postDetailDiv.innerHTML = ""
            let title = document.createElement("h2")
            let author = document.createElement("p")
            let content = document.createElement("p")

            title.textContent = newTitle
            author.textContent = "By: " + newAuthor
            content.textContent = newContent

            postDetailDiv.appendChild(title)
            postDetailDiv.appendChild(author)
            postDetailDiv.appendChild(content)
        })
        postListDiv.appendChild(postItem)

        form.reset()
    })
}

function main() {
    displayPosts()
    addNewPostListener()
}

document.addEventListener("DOMContentLoaded", main)
