// -----------------------------
// 3 équipes
// -----------------------------
const teams = [
    { name: "Équipe 1", score: 0 },
    { name: "Équipe 2", score: 0 },
    { name: "Équipe 3", score: 0 }
];

let activeTeam = 0;
let questionIndex = 0;

// -----------------------------
// Questions (12 segments)
// -----------------------------
const questions = [
    "Question 1…",
    "Question 2…",
    "Question 3…",
    "Question 4…",
    "Question 5…",
    "Question 6…",
    "Question 7…",
    "Question 8…",
    "Question 9…",
    "Question 10…",
    "Question 11…",
    "Question 12…"
];

// -----------------------------
// Dessin de la roue
// -----------------------------
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const segmentAngle = 360 / questions.length;

function drawWheel() {
    for (let i = 0; i < questions.length; i++) {
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.fillStyle = i % 2 === 0 ? "#0078d4" : "#00a4ef";
        ctx.arc(250, 250, 250, (i * segmentAngle) * Math.PI / 180, ((i + 1) * segmentAngle) * Math.PI / 180);
        ctx.fill();

        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(((i + 0.5) * segmentAngle) * Math.PI / 180);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText("Q" + (i + 1), 230, 10);
        ctx.restore();
    }
}

drawWheel();

// -----------------------------
// Spin centré sur le segment
// -----------------------------
document.getElementById("spinBtn").addEventListener("click", () => {
    const selectedIndex = Math.floor(Math.random() * questions.length);
    const stopAngle = (selectedIndex * segmentAngle) + (segmentAngle / 2);

    canvas.style.transition = "transform 4s ease-out";
    canvas.style.transform = `rotate(${3600 + stopAngle}deg)`;

    setTimeout(() => {
        showQuestion(selectedIndex);
    }, 4000);
});

// -----------------------------
// Affichage question
// -----------------------------
function showQuestion(index) {
    document.getElementById("questionText").textContent = questions[index];
    document.getElementById("questionBox").style.display = "block";
}

// -----------------------------
// Validation réponse
// -----------------------------
document.getElementById("validateBtn").addEventListener("click", () => {
    teams[activeTeam].score++;
    nextTurn();
});

// -----------------------------
// Gestion des équipes
// -----------------------------
function nextTurn() {
    questionIndex++;

    if (questionIndex >= questions.length) {
        alert(`${teams[activeTeam].name} a terminé ! Score : ${teams[activeTeam].score}`);

        activeTeam++;
        questionIndex = 0;

        if (activeTeam >= teams.length) {
            showFinalScores();
            return;
        }
    }

    updateActiveTeamHalo();
}

function updateActiveTeamHalo() {
    document.querySelectorAll(".team").forEach((el, index) => {
        el.classList.toggle("active", index === activeTeam);
    });
}

updateActiveTeamHalo();

// -----------------------------
// Scores finaux
// -----------------------------
function showFinalScores() {
    let msg = "🏆 Scores finaux :\n\n";
    teams.forEach(t => msg += `${t.name} : ${t.score} points\n`);
    alert(msg);
}
