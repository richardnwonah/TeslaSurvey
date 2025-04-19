document.addEventListener('DOMContentLoaded', () => {
    // Pop-up logic
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('close-popup');

    // Check if pop-up has been closed in this browser
    if (!localStorage.getItem('popupClosed')) {
        popup.classList.add('show');
    }

    closePopup.addEventListener('click', () => {
        popup.classList.remove('show');
        localStorage.setItem('popupClosed', 'true');
    });

    // Quiz form logic
    const quizForm = document.getElementById('quiz-form');
    const submitButton = document.getElementById('submit-quiz');
    const quizSection = document.getElementById('quiz-section');
    const winSection = document.getElementById('win-section');

    // Check if quiz has already been submitted
    if (localStorage.getItem('quizSubmitted')) {
        submitButton.disabled = true;
        submitButton.textContent = 'Quiz Already Submitted';
        quizSection.innerHTML = '<p>You have already submitted the survey from this browser.</p>';
    }

    // Correct answers for validation
    const correctAnswers = {
        q1: 'b', // 4 tons
        q2: 'b', // 30%
        q3: 'c', // 20 years
        q4: 'a', // Lithium
        q5: 'c', // Major improvement
        q6: 'b', // Solar
        q7: 'c', // 5,000 gallons
        q8: 'a', // Nitrogen Oxide
        q9: 'c', // 90%
        q10: 'a' // Policy advocacy
    };

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate all questions are answered
        for (let i = 1; i <= 10; i++) {
            const question = document.querySelector(`input[name="q${i}"]:checked`);
            const error = document.getElementById(`q${i}-error`);
            if (!question) {
                error.style.display = 'block';
                isValid = false;
            } else {
                error.style.display = 'none';
            }
        }

        if (isValid) {
            // Check correctness (optional, for feedback)
            let score = 0;
            for (let i = 1; i <= 10; i++) {
                const selected = document.querySelector(`input[name="q${i}"]:checked`).value;
                if (selected === correctAnswers[`q${i}`]) {
                    score++;
                }
            }
            console.log(`Score: ${score}/10`); // For debugging; can be shown to user if desired

            // Mark as submitted
            localStorage.setItem('quizSubmitted', 'true');
            submitButton.disabled = true;
            submitButton.textContent = 'Quiz Submitted';

            // Show win section with Google Form
            quizSection.classList.add('hidden');
            winSection.classList.remove('hidden');
        }
    });
});