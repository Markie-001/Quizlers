const questions = [
    {
        question: "What is 6 + 7?",
        options: ["67", "13", "14", "15"],
        answer: 1
    },
    {
        question: "Tungtungtungtungtungtungtung-",
        options: ["tung", "sahur", "sahu", "hur"],
        answer: 1
    },
    {
        question: "What is water?",
        options: ["water", "wet", "eww", "healthy"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionButtons = document.querySelectorAll(".option");
    const question = questions[currentQuestionIndex];

    questionElement.textContent = question.question;
    optionButtons.forEach((button, index) => {
        button.textContent = question.options[index];
        button.disabled = false;
        button.classList.remove("correct", "incorrect");
    });

    document.getElementById("next-btn").style.display = "inline";
    document.getElementById("restart-btn").style.display = "none";
}

function selectAnswer(selectedOptionIndex) {
    const question = questions[currentQuestionIndex];
    const optionsButtons = document.querySelectorAll(".option");

    if (selectedOptionIndex === question.answer) {
        score++;
        optionsButtons[selectedOptionIndex].classList.add("correct");
    } else {
        optionsButtons[selectedOptionIndex].classList.add("incorrect");
        optionsButtons[question.answer].classList.add("correct");
    }

    document.getElementById("score").textContent = `Score: ${score}`;
    optionsButtons.forEach(button => button.disabled = true);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("question").textContent = "none";
    document.querySelector('.options').style.display = "none";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("question").textContent = `Quiz completed! Your final score is ${score} out of ${questions.length}.`;
    document.getElementById("restart-btn").style.display = "inline";
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score").textContent = `Score: ${score}`;
    document.querySelector('.options').style.display = "grid";
    displayQuestion();
}

window.onload = displayQuestion;