document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progressBar");

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

    const form = document.getElementById("commentForm");
    const list = document.getElementById("commentList");

    function loadComments() {
        fetch("comments.json")
            .then(res => res.json())
            .then(data => {
                list.innerHTML = "";
                data.reverse().forEach(c => {
                    list.innerHTML += `
                        <div class="comment">
                            <strong>${c.name}</strong>
                            <p>${c.comment}</p>
                        </div>
                    `;
                });
            });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        fetch("save_comment.php", {
            method: "POST",
            body: new FormData(form)
        }).then(() => {
            form.reset();
            loadComments();
        });
    });

    loadComments();
});
