const questions = [
    {
        question: "Who was the lead singer for The Smiths?",
        answers: [
            {text: "Robert Smith", correct: false},
            {text: "Matty Healy", correct: false},
            {text: "Morrissey", correct: true},
            {text: "Ian Curtis", correct: false},
        ]
    },
    {
        question: "What guitar did Jimi Hendrix play?",
        answers: [
            { text: "Gibson ES-335", correct: false},
            { text: "Fender Telecaster", correct: false},
            { text: "PRS Silver Sky", correct: false},
            { text: "Fender Stratocaster", correct: true},
        ]
    },
    {
        question: "The Strokes hail from which city?",
        answers: [
            { text: "Los Angeles", correct: false},
            { text: "New York City", correct: true},
            { text: "London", correct: false},
            { text: "Philadelphia", correct: false},
        ]
    },
    {
        question: "Which of these is NOT a member of the Wu-Tang Clan?",
        answers: [
            { text: "Method Man", correct: false},
            { text: "Raekwon the Chef", correct: false},
            { text: "Young Clean Father", correct: true},
            { text: "Ghostface Killa", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innherHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;  

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = "Your Score: " + score + "/" + questions.length;
    nextButton.innerHTML = "Restart";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();
