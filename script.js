// ----------------------------
// VARIABLES GLOBALES
// ----------------------------
let currentQuestion = null;
let currentPlayer = 1;
let mode = "normal";
let timerInterval;
let timeLeft = 30;

const players = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};

// ----------------------------
// QUESTIONS CNPR
// ----------------------------
const questions = [
    { text: "Qu’est‑ce que le CNPR ?", hint: "Organisme régional", answer: "Centre National de la Paie et du Recouvrement" },
    { text: "Quel est le délai M‑2 ?", hint: "Déclaration", answer: "Déclaration deux mois avant l’événement" },
    // Ajoute ici tes 11 questions…
];

// ----------------------------
// MODE DE JEU
// ----------------------------
function setMode(m) {
    mode = m;
}

// ----------------------------
// ROTATION DE LA ROUE
// ----------------------------
function spinWheel() {
    const index = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[index];

    displayQuestion();
}

// ----------------------------
// AFFICHAGE QUESTION + INDICE
// ----------------------------
function displayQuestion() {
    document.getElementById("questionText").textContent = currentQuestion.text;
    document.getElementById("hintText").textContent = currentQuestion.hint;
    document.getElementById("hintText").style.display = "block";

    document.getElementById("answerBox").style.display = "none";
    document.getElementById("validationBox").style.display = "none";

    startTimer();
}

// ----------------------------
// TIMER
// ----------------------------
function startTimer() {
    const timer = document.getElementById("timer");
    timer.style.display = "none";
    timeLeft = 30;

    // Affichage du timer après 15 secondes
    setTimeout(() => {
        timer.style.display = "block";
        timer.textContent = "⏳ 30 secondes restantes";

        timerInterval = setInterval(() => {
            timeLeft--;
            timer.textContent = `⏳ ${timeLeft} secondes restantes`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showAnswer();
            }
        }, 1000);
    }, 15000);
}

// ----------------------------
// AFFICHAGE DE LA RÉPONSE
// ----------------------------
function showAnswer() {
    const answerBox = document.getElementById("answerBox");
    answerBox.style.display = "block";
    answerBox.textContent = currentQuestion.answer;

    document.getElementById("validationBox").style.display = "block";
}

// ----------------------------
// VALIDATION + SCORE
// ----------------------------
function validateAnswer(isCorrect) {
    let points = isCorrect ? 1 : -1;

    if (mode === "double") {
        points *= 2;
    }

    players[currentPlayer] += points;

    document.querySelector(`#p${currentPlayer} span`).textContent = players[currentPlayer];

    nextPlayer();
}

// ----------------------------
// CHANGEMENT DE JOUEUR
// ----------------------------
function nextPlayer() {
    currentPlayer++;
    if (currentPlayer > 4) currentPlayer = 1;

    document.getElementById("turnDisplay").textContent = `Tour du Joueur ${currentPlayer}`;
}
