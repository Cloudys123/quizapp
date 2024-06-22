document.addEventListener('DOMContentLoaded', (event) => {
    const startQuizButton = document.getElementById('start-quiz-button');
    if (startQuizButton) {
        startQuizButton.addEventListener('click', () => {
            localStorage.removeItem('quizScore'); // Clear the score when starting the quiz
            window.location.href = 'quiz1.html';
        });
    }

    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            checkAnswer();
            const currentPage = window.location.pathname.split('/').pop();
            const nextPage = getNextPage(currentPage);
            if (nextPage) {
                window.location.href = nextPage;
            } else {
                window.location.href = 'results.html';
            }
        });
    }

    if (window.location.pathname.includes('results.html')) {
        displayScore();
    }
});

function getNextPage(currentPage) {
    const pageMap = {
        'quiz1.html': 'quiz2.html',
        'quiz2.html': 'quiz3.html',
        'quiz3.html': 'quiz4.html',
        'quiz4.html': 'quiz5.html',
        'quiz5.html': 'results.html'
    };
    return pageMap[currentPage];
}

function checkAnswer() {
    const currentPage = window.location.pathname.split('/').pop();
    const questionMap = {
        'quiz1.html': { question: 'question1', correctAnswer: 'Paris' },
        'quiz2.html': { question: 'question2', correctAnswer: 'Jupiter' },
        'quiz3.html': { question: 'question3', correctAnswer: '100°C' },
        'quiz4.html': { question: 'question4', correctAnswer: 'Oxygen' },
        'quiz5.html': { question: 'question5', correctAnswer: 'Avocado' }
    };

    const currentQuestion = questionMap[currentPage];
    if (currentQuestion) {
        const selectedAnswer = document.querySelector(`input[name="${currentQuestion.question}"]:checked`);
        if (selectedAnswer) {
            const isCorrect = selectedAnswer.value === currentQuestion.correctAnswer;
            let score = localStorage.getItem('quizScore') || 0;
            score = parseInt(score) + (isCorrect ? 1 : 0);
            localStorage.setItem('quizScore', score);
        }
    }
}

function displayScore() {
    const score = localStorage.getItem('quizScore') || 0;
    const percentage = (score / 5) * 100; // Calculate the percentage
    const formattedPercentage = percentage.toFixed(2); // Format the percentage to two decimal places
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `${formattedPercentage}%`; // Display the formatted percentage

    // Create a div to hold the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex'; // Use flexbox
    buttonContainer.style.justifyContent = 'space-between'; // Space the buttons apart

    if (percentage < 50) {
        const reQuizButton = document.createElement('button');
        reQuizButton.textContent = 'Re-quiz';
        reQuizButton.addEventListener('click', () => {
            localStorage.removeItem('quizScore'); // Clear the score
            window.location.href = 'quiz1.html'; // Restart the quiz
        });
        buttonContainer.appendChild(reQuizButton); // Add the button to the container
    } else {
        // Add button to review correct answers
        const reviewButton = document.createElement('button');
        reviewButton.textContent = 'Review Answers';
        reviewButton.addEventListener('click', () => {
            window.location.href = 'answers.html'; // Replace 'answers.html' with the actual page name for reviewing answers
        });
        buttonContainer.appendChild(reviewButton); // Add the button to the container
    }

    // Add the container with the buttons after the score
    scoreElement.insertAdjacentElement('afterend', buttonContainer);

    // Add a line break
    const lineBreak = document.createElement('br');
    scoreElement.insertAdjacentElement('afterend', lineBreak);
}


function displayAnswers() {
    const answers = {
        'Question 1': 'Paris',
        'Question 2': 'Jupiter',
        'Question 3': '100°C',
        'Question 4': 'Oxygen',
        'Question 5': 'Avocado'
    };

    const answersList = document.getElementById('answers-list');
    for (const question in answers) {
        const answerItem = document.createElement('li');
        answerItem.textContent = `${question}, Answer: ${answers[question]}`;
        answersList.appendChild(answerItem);
    }

    // Add button to redirect to start page
    const startButton = document.createElement('button');
    startButton.textContent = 'Go to start';
    startButton.addEventListener('click', () => {
        localStorage.removeItem('quizScore'); // Clear the score
        window.location.href = 'start.html'; // Redirect to start page
    });
    answersList.insertAdjacentElement('afterend', startButton); // Add the button after the answers
}

// Call the displayAnswers function when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayAnswers();
});

