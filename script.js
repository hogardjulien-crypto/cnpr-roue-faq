/* ----------------------------------------------------
   MODE, SCORE, SONS, ROUE
---------------------------------------------------- */

let mode = "normal";
let currentPlayer = 1;

function setMode(m) {
    mode = m;
    document.getElementById("result").innerHTML = "Mode sélectionné : " + m;
    document.getElementById("answer").innerHTML = "";
    document.getElementById("hint").innerHTML = "";
}

function addPoint() {
    let points = mode === "double" ? 2 : 1;
    let id = "p" + currentPlayer;
    let score = parseInt(document.getElementById(id).innerHTML);
    document.getElementById(id).innerHTML = score + points;

    currentPlayer++;
    if (currentPlayer > 4) currentPlayer = 1;

    document.getElementById("turn").innerHTML = "🎯 Tour du Joueur " + currentPlayer;
}

/* ----------------------------------------------------
   QUESTIONS OFFICIELLES CNPR
---------------------------------------------------- */

const questions = [
    { q: "ℹ️ Définition : Qu’est‑ce que le CNPR ?", hint: "Centre spécialisé URSSAF…", answer: "Le CNPR est le Centre National de la Paie du Recouvrement." },
    { q: "Combien de bulletins de salaire sont traités chaque mois ?", hint: "Entre 6 200 et 6 300…", answer: "Environ 6 200 à 6 300 bulletins." },
    { q: "Peut‑on centraliser les bulletins électroniquement ?", hint: "Coffre‑fort numérique…", answer: "Oui, via DIGIPOSTE." },
    { q: "Comment sont calculés les titres‑restaurant ?", hint: "Valeur faciale 11,52 €…", answer: "Basé sur M‑2." },
    { q: "Comment est calculé le salaire brut ?", hint: "Points × valeur du point…", answer: "Formule URSSAF." },
    { q: "Combien de CNPR en France ?", hint: "Ils sont trois…", answer: "3 CNPR en France." },
    { q: "Combien de personnes travaillent dans le service ?", hint: "Petite équipe…", answer: "18 agents." },
    { q: "Que faire en cas d’erreur sur ma paie ?", hint: "Contact GA…", answer: "Contacter GA." },
    { q: "Quel est le montant du PMSS ?", hint: "Année 2026…", answer: "4 005 €." },
    { q: "Qu’est‑ce que le MNS ?", hint: "Prestations sociales…", answer: "Revenu net après cotisations." },
    { q: "Qu’est‑ce que la DSN ?", hint: "Déclaration mensuelle…", answer: "Transmission mensuelle obligatoire." }
];

/* ----------------------------------------------------
   CONSTRUCTION DE LA ROUE — SANS TEXTE
---------------------------------------------------- */

const wheel = document.getElementById("wheel");
const segmentAngle = 360 / questions.length;

questions.forEach((item, i) => {
    const segment = document.createElement("div");
    segment.className = "segment";

    // Position du segment
    segment.style.transform = `rotate(${i * segmentAngle}deg) skewY(${90 - segmentAngle}deg)`;

    // 🎨 Alternance bleu URSSAF / blanc
    segment.style.background = (i % 2 === 0) ? "#005AAA" : "#FFFFFF";

    // Aucun texte dans la roue
    segment.innerHTML = "";

    wheel.appendChild(segment);
});

/* ----------------------------------------------------
   SPIN DE LA ROUE
---------------------------------------------------- */

function spin() {
    document.getElementById("answer").innerHTML = "";
    document.getElementById("hint").innerHTML = "";

    document.getElementById("sound-click").play();
    document.getElementById("sound-spin").play();
    document.getElementById("turn").innerHTML = "🎡 La roue tourne…";

    const random = Math.floor(Math.random() * questions.length);
    const angle = 360 * 5 + (360 - random * segmentAngle);
    wheel.style.transform = `rotate(${angle}deg)`;

    setTimeout(() => {
        const item = questions[random];

        document.getElementById("result").innerHTML =
            "👉 Question tirée : <br><br><strong>" + item.q + "</strong>";

        document.getElementById("hint").innerHTML =
            "💡 Indice : " + item.hint;

        setTimeout(() => {
            document.getElementById("answer").innerHTML =
                "✔️ Réponse : <br><br>" + item.answer.replace(/\n/g, "<br>");

            document.getElementById("sound-ding").play();
            addPoint();

        }, 10000);

    }, 5000);
}
