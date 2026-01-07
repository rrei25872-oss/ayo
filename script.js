document.addEventListener("DOMContentLoaded", function() {
    const quizForm = document.getElementById("quizForm");

    quizForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const fields = quizForm.querySelectorAll("input, textarea");
        let allFilled = true;

        fields.forEach(f => {
            if (f.value.trim() === "") allFilled = false;
        });

        if (!allFilled) {
            alert("Please fill all fields before submitting.");
            return false;
        }

        const formData = new FormData(quizForm);

        fetch(quizForm.action, {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                window.location.href = "thankyou.html";
            } else {
                alert("Oops! There was a problem submitting your form.");
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form.");
            console.error(error);
        });
    });

    const progressBar = document.getElementById("progressBar");
    window.addEventListener("scroll", function() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
    });
});
