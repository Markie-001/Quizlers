const questions = [
    {
        type: "keuze",
        question: "Wat is nepnieuws?",
        options: ["Reclame", "Onjuiste informatie die echt lijkt", "Nieuws op tv", "Schoolnieuws"],
        answer: 1,
        image: "Foto/Numbers.jpg"
    },
    {
        type: "open",
        question: "What is the capital of France?",
        answer: "Paris",
        image: "Foto/Paris.jpg"
    },
    {
        type: "keuze",
        question: "What is water?",
        options: ["water", "wet", "eww", "healthy"],
        answer: 0,
        image: "Foto/Water.jpg"
    },
    {
        type: "open",
        question: "Wie is Olivier",
        answer: "Olivier",
        image: "Foto/Numbers.jpg"
    },
    {
        type: "keuze",
        question: "What is water?",
        options: ["water", "wet", "eww", "healthy"],
        answer: 0,
        image: "Foto/Water.jpg"
    },
    {
        type: "keuze",
        question: "What is water?",
        options: ["water", "wet", "eww", "healthy"],
        answer: 0,
        image: "Foto/Water.jpg"
    },
    {
        type: "keuze",
        question: "What is water?",
        options: ["water", "wet", "eww", "healthy"],
        answer: 0,
        image: "Foto/Water.jpg"
    },
    {
        type: "keuze",
        question: "What is water?",
        options: ["water", "wet", "eww", "h2o"],
        answer: 3,
        image: "Foto/Water.jpg"
    },
    {
        type: "keuze",
        question: "What is water?",
        options: ["water", "wet", "eww", "healthy"],
        answer: 0,
        image: "Foto/Water.jpg"
    },
    {
        type: "keuze",
        question: "What is water?",
        options: ["water", "wet", "eww", "healthy"],
        answer: 0,
        image: "Foto/Water.jpg"
    },
    
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionButtons = document.querySelectorAll(".option");
    const openInput = document.getElementById("open-input");
    const submitOpen = document.getElementById("submit-open");
    const countdown = document.getElementById("dountdown");

    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;

    const imageElement = document.getElementById("question-image");
    if (question.image) {
        imageElement.src = question.image;
        imageElement.style.display = "block";
    } else {
        imageElement.src = "";
        imageElement.style.display = "none";
    }

    if (question.type === "keuze") {
        document.querySelector('.options').style.display = "grid";
        openInput.style.display = "none";
        submitOpen.style.display = "none";

        optionButtons.forEach((button, index) => {
            button.textContent = question.options[index];
            button.disabled = false;
            button.classList.remove("correct", "incorrect");
        });

    } else if (question.type === "open") {
        document.querySelector('.options').style.display = "none";
        openInput.style.display = "inline";
        submitOpen.style.display = "inline";
        openInput.value = "";
    }

    document.getElementById("feedback").textContent = "";
    starttimer();
}

function submitOpenAnswer() {
    const input = document.getElementById("open-input");
    const feedback = document.getElementById("feedback");
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        score++;
        feedback.textContent = "Goed gedaan! ✅";
        feedback.className = "correct";
    } else {
        feedback.textContent = "Fout! De juiste antwoord is: " + correctAnswer;
        feedback.className = "incorrect";
    }

    document.getElementById("score").textContent = `Score: ${score}`;
    starttimer();
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

function starttimer() {
    clearInterval(timer);
    timeLeft = 10;
    countdown.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        countdown.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!currentQuestionIndex) {
                nextQuestion();
            }
        }
    }, 1000)
}

function showResults() {
    document.getElementById("question-image").style.display = "none";
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
    document.getElementById("feedback").textContent = "";
    document.getElementById("restart-btn").style.display = "none";
    document.getElementById("next-btn").style.display = "inline";
    document.querySelector('.options').style.display = "grid";
    document.getElementById("question-image").style.display = "block";
    
    displayQuestion();
}

window.onload = displayQuestion;
