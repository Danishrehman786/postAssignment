document.getElementById("show-login").addEventListener("click", function () {
    document.getElementById("signup-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
});

document.getElementById("show-signup").addEventListener("click", function () {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("signup-container").style.display = "block";
});

document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    if (localStorage.getItem(email)) {
        alert("Email already exists! Please login.");
    } else {
        let user = { name: name, email: email, password: password, posts: [] };
        localStorage.setItem(email, JSON.stringify(user));
        alert("Sign up successful! Please login.");
        document.getElementById("signup-container").style.display = "none";
        document.getElementById("login-container").style.display = "block";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const postBtn = document.getElementById('postBtn');
    const postsContainer = document.getElementById('posts');
    const bgColorInput = document.getElementById('bgColor');
    const postText = document.getElementById('postText');

    postBtn.addEventListener('click', () => {
        const postContent = postText.value;
        const bgColor = bgColorInput.value;

        if (postContent) {
            const postElement = document.createElement('div');
            postElement.style.backgroundColor = bgColor;
            postElement.textContent = postContent;
            postsContainer.appendChild(postElement);

            postText.value = '';
        }
    });
});

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    let user = JSON.parse(localStorage.getItem(email));

    if (user && user.password === password) {
        sessionStorage.setItem("loggedInUser", email);
        showPostSection();
        displayPosts();
    } else {
        alert("Invalid email or password!");
    }
});

document.getElementById("postBtn").addEventListener("click", function (e) {
    e.preventDefault();
    let postText = document.getElementById("postText").value;
    let bgColor = document.getElementById("bgColor").value;

    if (postText.trim() === "") {
        alert("Please write something before posting.");
        return;
    }

    let loggedInUser = sessionStorage.getItem("loggedInUser");
    let user = JSON.parse(localStorage.getItem(loggedInUser));

    if (user) {
        user.posts.push({ text: postText, color: bgColor });
        localStorage.setItem(loggedInUser, JSON.stringify(user));
        displayPosts();
        document.getElementById("postText").value = "";
    } else {
        alert("User not found. Please log in again.");
    }
});

function displayPosts() {
    let postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";

    let loggedInUser = sessionStorage.getItem("loggedInUser");
    let user = JSON.parse(localStorage.getItem(loggedInUser));

    if (user && user.posts.length > 0) {
        user.posts.forEach(post => {
            let postDiv = document.createElement("div");
            postDiv.classList.add("post");
            postDiv.style.backgroundColor = post.color;
            postDiv.textContent = post.text;
            postsContainer.appendChild(postDiv);
        });
    } else {
        postsContainer.innerHTML = "<p>No posts yet.</p>";
    }
}

function showPostSection() {
    document.getElementById("signup-container").style.display = "none";
    document.getElementById("login-container").style.display = "none";
    document.getElementById("post-container").style.display = "block";
    document.getElementById("logout-btn").style.display = "block"; 
    displayPosts();
}

document.getElementById("logout-btn").addEventListener("click", function () {
    sessionStorage.removeItem("loggedInUser");
    location.reload(); 
});

window.onload = function () {
    let loggedInUser = sessionStorage.getItem("loggedInUser");

    if (loggedInUser) {
        showPostSection();
    } else {
        document.getElementById("signup-container").style.display = "block";
        document.getElementById("login-container").style.display = "none";
        document.getElementById("post-container").style.display = "none";
        document.getElementById("logout-btn").style.display = "none";
    }
};
