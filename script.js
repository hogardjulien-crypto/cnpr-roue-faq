let currentQuestion = null;
let currentPlayer = 1;
let mode = "normal";
let timerInterval;
let timeLeft = 30;

const players = { 1: 0, 2: 0, 3: 0, 4: 0 };

// ----------------------------
// QUESTIONS CNPR (officielles)
// ----------------------------
const questions = [
    {
        text: "Qu’est‑ce que le CNPR ?",
        hint: "Centre spécialisé URSSAF",
        answer: "Le CNPR est le Centre National de la Paie du Recouvrement. Il produit la paie pour les agents du réseau URSSAF."
    },
    {
        text: "Combien d’organismes sont gérés par le CNPR Centre‑Val de Loire ?",
        hint: "Moins de 10",
        answer: "Le CNPR Centre‑Val de Loire gère 9 organismes."
    },
    {
        text: "Combien de bulletins de salaire sont traités chaque mois ?",
        hint: "Entre 6000 et 6500",
        answer: "Le CNPR Centre‑Val de Loire produit environ 6 200 à 6 300 bulletins de salaire par mois."
    },
    {
        text: "Peut‑on centraliser les bulletins de salaire électroniquement ?",
        hint: "Coffre‑fort",
        answer: "Oui, via DIGIPOSTE : stockage sécurisé, conservation à vie, accès 24/7."
    },
    {
        text: "Comment sont calculés les titres restaurant ?",
        hint: "60% employeur",
        answer: "Valeur faciale : 12€. Employeur : 7,20€ (60%). Salarié : 4,80€ (40%). Règle M‑2 appliquée."
    },
    {
        text: "Comment est calculé le salaire brut ?",
        hint: "Formule URSSAF",
        answer: "Formule : (Coefficient + Compétences + Expérience) × Valeur du point (7,60939€ en 2026)."
    },
    {
        text: "Combien de CNPR existe‑t‑il en France ?",
        hint: "Plus que 2",
        answer: "Il existe 3 CNPR : Centre‑Val de Loire, Midi‑Pyrénées, Rhône‑Alpes."
    },
    {
        text: "Combien de personnes travaillent dans le service ?",
        hint: "20 agents",
        answer: "20 agents dont 1 manager et 3 assistantes techniques."
    },
    {
        text: "Que faire si j’ai des questions sur ma paie ?",
        hint: "GA",
        answer: "Contacter la GA : mail ga.cvl@urssaf.fr, ticket GLPI PRISM, ou formulaire DEA."
    },
    {
        text: "Quel est le montant du PMSS ?",
        hint: "4000€",
        answer: "Le PMSS 2026 est de 4 005€."
    },
    {
        text: "Qu’est‑ce que le Montant Net Social (MNS) ?",
        hint: "Prestations sociales",
        answer: "Le MNS est le revenu net après cotisations obligatoires. Sert pour RSA, Prime d’activité, etc."
    },
    {
        text: "Qu’est‑ce que la DSN ?",
        hint: "Déclaration mensuelle",
        answer: "La DSN regroupe données de paie, cotisations et événements. Elle remplace les anciennes déclarations."
    }
];

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
