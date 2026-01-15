document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progressBar");
    const form = document.getElementById("commentForm");
    const list = document.getElementById("commentList");
    let lastPost = 0;

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        progressBar.style.width = (scrollTop / docHeight) * 100 + "%";
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
        });
    });

    function loadComments() {
        fetch("comments.json")
            .then(res => res.json())
            .then(data => {
                list.innerHTML = "";
                data.reverse().forEach((c, i) => {
                    let replies = "";
                    c.replies.forEach(r => {
                        replies += `
                            <div class="reply">
                                <strong>${r.name}</strong>
                                <small>${r.time}</small>
                                <p>${r.text}</p>
                            </div>
                        `;
                    });

                    list.innerHTML += `
                        <div class="comment">
                            <strong>${c.name}</strong>
                            <small>${c.time}</small>
                            <p>${c.text}</p>
                            <button class="reply-btn" onclick="showReply(${i})">Reply</button>
                            <button class="delete-btn" onclick="deleteComment(${i})">Delete</button>
                            <div id="replyBox-${i}"></div>
                            ${replies}
                        </div>
                    `;
                });
            });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        if (Date.now() - lastPost < 15000) {
            alert("Please wait before posting again");
            return;
        }
        lastPost = Date.now();

        fetch("save_comment.php", {
            method: "POST",
            body: new FormData(form)
        }).then(() => {
            form.reset();
            loadComments();
        });
    });

    window.showReply = index => {
        document.getElementById(`replyBox-${index}`).innerHTML = `
            <form class="reply-form" onsubmit="sendReply(event, ${index})">
                <input name="name" placeholder="Your name" required>
                <textarea name="reply" required></textarea>
                <button class="btn">Reply</button>
            </form>
        `;
    };

    window.sendReply = (e, index) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        fd.append("index", index);

        fetch("reply.php", {
            method: "POST",
            body: fd
        }).then(loadComments);
    };

    window.deleteComment = index => {
        const pass = prompt("Admin password");
        if (!pass) return;

        fetch("delete.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ index, pass })
        }).then(loadComments);
    };

    loadComments();
});
