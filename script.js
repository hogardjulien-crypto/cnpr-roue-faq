let currentQuestion = null;
let currentPlayer = 1;
let mode = "normal";
let timerInterval;
let timeLeft = 30;

const players = { 1: 0, 2: 0, 3: 0, 4: 0 };

// ----------------------------
// QUESTIONS CNPR
// ----------------------------
const questions = [
    { text: "Qu’est‑ce que le CNPR ?", hint: "Centre spécialisé URSSAF",
      answer: "Le CNPR est le Centre National de la Paie du Recouvrement. Il produit la paie pour les agents du réseau URSSAF." },

    { text: "Combien d’organismes sont gérés par le CNPR Centre‑Val de Loire ?", hint: "Moins de 10",
      answer: "Le CNPR Centre‑Val de Loire gère 9 organismes." },

    { text: "Combien de bulletins de salaire sont traités chaque mois ?", hint: "Entre 6000 et 6500",
      answer: "Le CNPR Centre‑Val de Loire produit environ 6 200 à 6 300 bulletins de salaire par mois." },

    { text: "Peut‑on centraliser les bulletins de salaire électroniquement ?", hint: "Coffre‑fort",
      answer: "Oui, via DIGIPOSTE : stockage sécurisé, conservation à vie, accès 24/7." },

    { text: "Comment sont calculés les titres restaurant ?", hint: "60% employeur",
      answer: "Valeur faciale : 12€. Employeur : 7,20€ (60%). Salarié : 4,80€ (40%). Règle M‑2 appliquée." },

    { text: "Comment est calculé le salaire brut ?", hint: "Formule URSSAF",
      answer: "Formule : (Coefficient + Compétences + Expérience) × Valeur du point (7,60939€ en 2026)." },

    { text: "Combien de CNPR existe‑t‑il en France ?", hint: "Plus que 2",
      answer: "Il existe 3 CNPR : Centre‑Val de Loire, Midi‑Pyrénées, Rhône‑Alpes." },

    { text: "Combien de personnes travaillent dans le service ?", hint: "20 agents",
      answer: "20 agents dont 1 manager et 3 assistantes techniques." },

    { text: "Que faire si j’ai des questions sur ma paie ?", hint: "GA",
      answer: "Contacter la GA : mail ga.cvl@urssaf.fr, ticket GLPI PRISM, ou formulaire DEA." },

    { text: "Quel est le montant du PMSS ?", hint: "4000€",
      answer: "Le PMSS 2026 est de 4 005€." },

    { text: "Qu’est‑ce que le Montant Net Social (MNS) ?", hint: "Prestations sociales",
      answer: "Le MNS est le revenu net après cotisations obligatoires. Sert pour RSA, Prime d’activité, etc." },

    { text: "Qu’est‑ce que la DSN ?", hint: "Déclaration mensuelle",
      answer: "La DSN regroupe données de paie, cotisations et événements. Elle remplace les anciennes déclarations." }
];

// ----------------------------
// ANTI‑DOUBLONS
// ----------------------------
let remainingQuestions = [...questions];

// ----------------------------
// MODE
// ----------------------------
function setMode(m) {
    mode = m;
}

// ----------------------------
// ROUE
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

function drawRotatingWheel(angleRotation) {
    ctx.clearRect(0, 0, 400, 400);
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angleRotation);
    ctx.translate(-200, -200);
    drawWheel();
    ctx.restore();
}

// ----------------------------
// ANIMATION
// ----------------------------
let rotation = 0;
let spinning = false;

function spinWheel() {

    if (remainingQuestions.length === 0) {
        showFinalRanking();
        return;
    }

    if (spinning) return;
    spinning = true;

    const spinTime = 3000;
    const extraSpins = 5;

    const finalIndex = Math.floor(Math.random() * remainingQuestions.length);
    const finalAngle = finalIndex * angle;

    const targetRotation = extraSpins * 2 * Math.PI + finalAngle;
    const start = performance.now();

    function animateWheel(now) {
        const elapsed = now - start;

        if (elapsed < spinTime) {
            const progress = elapsed / spinTime;
            const easeOut = 1 - Math.pow(1 - progress, 3);

            rotation = easeOut * targetRotation;
            drawRotatingWheel(rotation);
            requestAnimationFrame(animateWheel);

        } else {
            rotation = targetRotation;
            drawRotatingWheel(rotation);

            spinning = false;

            currentQuestion = remainingQuestions[finalIndex];
            remainingQuestions.splice(finalIndex, 1);

            displayQuestion();
        }
    }

    requestAnimationFrame(animateWheel);
}

// ----------------------------
// AFFICHAGE QUESTION
// ----------------------------
function displayQuestion() {
    document.getElementById("questionText").textContent = currentQuestion.text;

    const hint = document.getElementById("hintText");
    hint.style.display = "none";

    setTimeout(() => {
        hint.textContent = currentQuestion.hint;
        hint.style.display = "block";
    }, 25000);

    document.getElementById("answerBox").style.display = "none";
    document.getElementById("validationBox").style.display = "none";

    startTimer();
}

// ----------------------------
// TIMER
// ----------------------------
function startTimer() {
    const timer = document.getElementById("timer");
    timeLeft = 30;

    timer.style.display = "block";
    timer.textContent = `⏳ ${timeLeft} secondes restantes`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = `⏳ ${timeLeft} secondes restantes`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showAnswer();
        }
    }, 1000);
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

// ----------------------------
// CHANGEMENT DE JOUEUR + HALO
// ----------------------------
function updateActivePlayerDisplay() {
    document.querySelectorAll(".player").forEach(p => {
        p.classList.remove("activePlayer");
    });

    document.getElementById("p" + currentPlayer).classList.add("activePlayer");
}

function nextPlayer() {
    currentPlayer++;
    if (currentPlayer > 4) currentPlayer = 1;

    document.getElementById("turnDisplay").textContent = `Tour du Joueur ${currentPlayer}`;
    updateActivePlayerDisplay();
}

// ----------------------------
// ÉCRAN DE FIN
// ----------------------------
function showFinalRanking() {
    const endScreen = document.getElementById("endScreen");
    const rankingDiv = document.getElementById("ranking");

    const ranking = [
        { player: "Joueur 1", score: players[1] },
        { player: "Joueur 2", score: players[2] },
        { player: "Joueur 3", score: players[3] },
        { player: "Joueur 4", score: players[4] }
    ];

    ranking.sort((a, b) => b.score - a.score);

    rankingDiv.innerHTML = ranking
        .map((r, i) => `<p>${i + 1}. ${r.player} — <strong>${r.score} pts</strong></p>`)
        .join("");

    endScreen.style.display = "block";
}

// ----------------------------
// REJOUER
// ----------------------------
function restartGame() {

    // Réinitialiser les questions restantes
    remainingQuestions = [...questions];

    // Réinitialiser les scores
    players[1] = 0;
    players[2] = 0;
    players[3] = 0;
    players[4] = 0;

    document.querySelector("#p1 span").textContent = 0;
    document.querySelector("#p2 span").textContent = 0;
    document.querySelector("#p3 span").textContent = 0;
    document.querySelector("#p4 span").textContent = 0;

    // Revenir au joueur 1
    currentPlayer = 1;
    document.getElementById("turnDisplay").textContent = "Tour du Joueur 1";
    updateActivePlayerDisplay();

    // Effacer question / indice / réponse
    document.getElementById("questionText").textContent = "";
    document.getElementById("hintText").style.display = "none";
    document.getElementById("answerBox").style.display = "none";
    document.getElementById("validationBox").style.display = "none";

    // Arrêter le timer si en cours
    clearInterval(timerInterval);
    document.getElementById("timer").style.display = "none";

    // Réinitialiser la rotation et redessiner la roue
    rotation = 0;
    drawRotatingWheel(0);

    // Masquer l'écran de fin si visible
    const endScreen = document.getElementById("endScreen");
    if (endScreen) endScreen.style.display = "none";

    alert("🔁 Nouvelle partie ! La roue et les questions ont été réinitialisées.");
}
