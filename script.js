// -----------------------------
// 3 équipes
// -----------------------------
const teams = [
    { name: "Équipe 1", score: 0 },
    { name: "Équipe 2", score: 0 },
    { name: "Équipe 3", score: 0 }
];

let activeTeam = 0;
let usedQuestions = [];
let spinning = false;

// -----------------------------
// 12 questions CNPR officielles
// -----------------------------
const questions = [
    {
        q: "Qu’est‑ce que le CNPR ?",
        a: "Le CNPR est le Centre National de la Paie du Recouvrement. Il s’agit d’un centre spécialisé du réseau URSSAF chargé de produire la paie pour les agents, en appliquant les règles nationales et les procédures internes."
    },
    {
        q: "Combien d’organismes sont gérés par le CNPR Centre‑Val de Loire ?",
        a: "Le CNPR Centre‑Val de Loire gère 9 organismes."
    },
    {
        q: "Combien de bulletins de salaire sont traités chaque mois ?",
        a: "Le CNPR Centre‑Val de Loire produit environ 6 200 à 6 300 bulletins de salaire par mois."
    },
    {
        q: "Peut‑on centraliser les bulletins de salaire électroniquement ?",
        a: "Oui, via le coffre‑fort numérique DIGIPOSTE : stockage sécurisé, conservation à vie, accès 24/7."
    },
    {
        q: "Comment sont calculés les titres restaurant ?",
        a: "Valeur faciale : 12,00 € — Part employeur : 7,20 € — Part salarié : 4,80 €. Prélèvement : 4,80 € × nombre de titres. Règle M‑2 : titres de mars → éléments de janvier ; titres d’avril → éléments de février."
    },
    {
        q: "Comment est calculé le salaire brut ?",
        a: "Formule URSSAF : (Coefficient + Compétences + Expérience) × Valeur du point (7,60939 € en 2026)."
    },
    {
        q: "Combien de CNPR existe‑t‑il en France ?",
        a: "Il existe 3 CNPR : Centre‑Val de Loire, Midi‑Pyrénées, Rhône‑Alpes."
    },
    {
        q: "Combien de personnes travaillent dans le service ?",
        a: "Le CNPR Centre‑Val de Loire compte 20 agents, dont 1 manager et 3 assistantes techniques."
    },
    {
        q: "Que faire si j’ai des questions sur ma paie ?",
        a: "Contacter la Gestion Administrative (GA) : mail ga.cvl@urssaf.fr, ticket GLPI via PRISM, ou formulaire dans le DEA."
    },
    {
        q: "Quel est le montant du PMSS ?",
        a: "Le PMSS 2026 est de 4 005 €."
    },
    {
        q: "Qu’est‑ce que le Montant Net Social (MNS) ?",
        a: "Le MNS est le revenu net après cotisations sociales obligatoires. Il sert notamment pour la Prime d’activité, le RSA et d’autres prestations sociales."
    },
    {
        q: "Qu’est‑ce que la DSN ?",
        a: "La DSN est une transmission mensuelle obligatoire regroupant données de paie, cotisations et événements. Elle remplace la majorité des anciennes déclarations sociales."
    }
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
    if (spinning) return;
    spinning = true;

    let available = questions
        .map((q, i) => i)
        .filter(i => !usedQuestions.includes(i));

    if (available.length === 0) {
        alert(`${teams[activeTeam].name} a terminé ! Score : ${teams[activeTeam].score}`);
        nextTeam();
        return;
    }

    const selectedIndex = available[Math.floor(Math.random() * available.length)];
    const stopAngle = (selectedIndex * segmentAngle) + (segmentAngle / 2);

    canvas.style.transition = "transform 4s ease-out";
    canvas.style.transform = `rotate(${3600 + stopAngle}deg)`;

    setTimeout(() => {
        showQuestion(selectedIndex);
        spinning = false;
    }, 4000);
});

// -----------------------------
// Affichage question
// -----------------------------
function showQuestion(index) {
    usedQuestions.push(index);

    document.getElementById("questionText").textContent = questions[index].q;
    document.getElementById("questionBox").style.display = "block";

    document.getElementById("validateBtn").onclick = () => {
        teams[activeTeam].score++;
        nextTurn();
    };
}

// -----------------------------
// Gestion des équipes
// -----------------------------
function nextTurn() {
    if (usedQuestions.length >= questions.length) {
        alert(`${teams[activeTeam].name} a terminé ! Score : ${teams[activeTeam].score}`);
        nextTeam();
        return;
    }
}

function nextTeam() {
    activeTeam++;
    usedQuestions = [];

    if (activeTeam >= teams.length) {
        showFinalScores();
        return;
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
