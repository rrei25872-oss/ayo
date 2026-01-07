document.addEventListener("DOMContentLoaded", function() {
    const quizSection = document.getElementById("quiz");

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit All Answers";
    submitBtn.classList.add("btn");
    submitBtn.style.marginTop = "20px";
    quizSection.appendChild(submitBtn);

    let submitted = false;

    submitBtn.addEventListener("click", function() {
        if (submitted) {
            alert("You have already submitted your answers. ✅");
            return;
        }

        const textareas = quizSection.querySelectorAll("textarea");
        let allFilled = true;

        textareas.forEach((ta) => {
            if (ta.value.trim() === "") {
                allFilled = false;
            }
        });

        if (!allFilled) {
            alert("Please answer all questions before submitting.");
            return;
        }

        submitted = true;

        textareas.forEach(ta => ta.disabled = true);

        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";
        
        const thankYouMsg = document.createElement("p");
        thankYouMsg.textContent = "Thank you for submitting your answers! 🎉";
        thankYouMsg.style.textAlign = "center";
        thankYouMsg.style.color = "#facc15";
        thankYouMsg.style.fontSize = "1.2rem";
        thankYouMsg.style.marginTop = "15px";
        quizSection.appendChild(thankYouMsg);
    });
});