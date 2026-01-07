document.addEventListener("DOMContentLoaded", function() {
    const quizForm = document.getElementById("quizForm");

    quizForm.addEventListener("submit", function(e) {
        const textareas = quizForm.querySelectorAll("textarea");
        let allFilled = true;

        textareas.forEach((ta) => {
            if (ta.value.trim() === "") {
                allFilled = false;
            }
        });

        if (!allFilled) {
            e.preventDefault();
            alert("Please answer all questions before submitting.");
            return false;
        }
    });

    const progressBar = document.getElementById("progressBar");
    window.addEventListener("scroll", function() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
    });
});
