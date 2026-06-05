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

const questions = [
    { q: "Qu’est‑ce que le CNPR ?", hint: "Centre spécialisé URSSAF…", answer: "Le CNPR est le Centre National de la Paie du Recouvrement." },
    { q: "Combien de bulletins de salaire ?", hint: "Plus de 6 000…", answer: "Environ 6 200 à 6 300 bulletins par mois." },
    { q: "Centralisation des bulletins ?", hint: "Coffre‑fort numérique…", answer: "Oui, via DIGIPOSTE." },
    { q: "Titres‑restaurant ?", hint: "11,52 €…", answer: "Valeur 11,52 €, part employeur 6,91 €, salarié 4,61 €." },
    { q: "Salaire brut ?", hint: "Points × valeur…", answer: "Points × 7,60939 €." },
    { q: "Combien de CNPR ?", hint: "Ils sont trois…", answer: "3 CNPR en France." },
    { q: "Effectif ?", hint: "Petite équipe…", answer: "18 agents, manager : Laetitia PERRIER." },
    { q: "Erreur de paie ?", hint: "Contact GA…", answer: "ga.cvl@urssaf.fr ou ticket GLPI." },
    { q: "PMSS ?", hint: "Année 2026…", answer: "4 005 €." },
    { q: "Montant Net Social ?", hint: "Prestations…", answer: "Revenu net après cotisations obligatoires." },
    { q: "DSN ?", hint: "Déclaration mensuelle…", answer: "Transmission mensuelle obligatoire des données de paie." }
];

const wheel = document.getElementById("wheel");
const segmentAngle = 360 / questions.length;

questions.forEach((item, i) => {
    const segment = document.createElement("div");
    segment.className = "segment";
    segment.style.transform = `rotate(${i * segmentAngle}deg) skewY(${90 - segmentAngle}deg)`;
    segment.innerHTML = item.q;
    wheel.appendChild(segment);
});

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
                "✔️ Réponse : " + item.answer;

            document.getElementById("sound-ding").play();
            addPoint();

        }, 10000);

    }, 5000);
}
