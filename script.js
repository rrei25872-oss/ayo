document.addEventListener("DOMContentLoaded", function() {
    const quizForm = document.getElementById("quizForm");

    quizForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const textareas = quizForm.querySelectorAll("textarea");
        let allFilled = true;

        textareas.forEach((ta) => {
            if (ta.value.trim() === "") {
                allFilled = false;
            }
        });

        if (!allFilled) {
            alert("Please answer all questions before submitting.");
            return false;
        }
        
        const formData = new FormData(quizForm);
        fetch(quizForm.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Success → redirect to thank you page
                window.location.href = "thankyou.html";
            } else {
                alert("Oops! There was a problem submitting your form.");
            }
        }).catch(error => {
            alert("Oops! There was a problem submitting your form.");
            console.error(error);
        });
    });
});
