let currentQuestion = null;
let currentPlayer = 1;
let mode = "normal";
let timerInterval;
let timeLeft = 30;

const players = { 1: 0, 2: 0, 3: 0, 4: 0 };

// ----------------------------
// QUESTIONS CNPR (officielles)
// ----------------------------
const questions = [/* (coller ici le tableau fourni plus haut) */];

// ----------------------------
// MODE
// ----------------------------
function setMode(m) {
    mode = m;
}

// ----------------------------
// DESSIN DE LA ROUE
// ----------------------------
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const segmentCount = questions.length;
const angle = (2 * Math.PI) / segmentCount;

function drawWheel() {
    for (let i = 0; i < segmentCount; i++) {
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, i * angle, (i + 1) * angle);
        ctx.fillStyle = i % 2 === 0 ? "#005AAA" : "#7FB3D5";
        ctx.fill();
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(i * angle + angle / 2);
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.fillText(`Q${i + 1}`, 120, 5);
        ctx.restore();
    }
}
drawWheel();

// ----------------------------
// SPIN
// ----------------------------
function spinWheel() {
    const index = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[index];
    displayQuestion();
}

// ----------------------------
// AFFICHAGE QUESTION
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
// RÉPONSE
// ----------------------------
function showAnswer() {
    const answerBox = document.getElementById("answerBox");
    answerBox.style.display = "block";
    answerBox.textContent = currentQuestion.answer;

    document.getElementById("validationBox").style.display = "block";
}

// ----------------------------
// SCORE
// ----------------------------
function validateAnswer(isCorrect) {
    let points = isCorrect ? 1 : -1;
    if (mode === "double") points *= 2;

    players[currentPlayer] += points;
    document.querySelector(`#p${currentPlayer} span`).textContent = players[currentPlayer];

    nextPlayer();
}

function nextPlayer() {
    currentPlayer++;
    if (currentPlayer > 4) currentPlayer = 1;
    document.getElementById("turnDisplay").textContent = `Tour du Joueur ${currentPlayer}`;
}
