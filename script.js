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

    {
        q: "ℹ️ Définition : Qu’est‑ce que le CNPR ?",
        hint: "Centre spécialisé URSSAF…",
        answer: "Le CNPR est le Centre National de la Paie du Recouvrement. Il s’agit d’un centre spécialisé chargé de produire la paie pour le réseau URSSAF."
    },

    {
        q: "Combien de bulletins de salaire sont traités chaque mois ?",
        hint: "Entre 6 200 et 6 300…",
        answer: "Le CNPR Centre‑Val de Loire produit environ 6 200 à 6 300 bulletins de salaire par mois."
    },

    {
        q: "Peut‑on centraliser les bulletins de salaire électroniquement ?",
        hint: "Coffre‑fort numérique…",
        answer: "Oui, via le coffre‑fort numérique DIGIPOSTE : stockage sécurisé, conservation à vie, accès 24/7."
    },

    {
        q: "Comment sont calculés les titres‑restaurant ?",
        hint: "Valeur faciale 11,52 €…",
        answer:
            "Paramètres :\n" +
            "• Valeur faciale : 11,52 €\n" +
            "• Part employeur : 6,91 € (60 %)\n" +
            "• Part salarié : 4,61 € (40 %)\n\n" +
            "Prélèvement : 4,61 € × nombre de titres attribués\n\n" +
            "📌 Calcul basé sur M‑2 :\n" +
            "• Titres de mars → éléments de janvier\n" +
            "• Titres d’avril → éléments de février"
    },

    {
        q: "Comment est calculé le salaire brut ?",
        hint: "Points × valeur du point…",
        answer:
            "Formule URSSAF : (Coefficient + Compétences + Expérience) × Valeur du point.\n" +
            "Valeur du point : 7,60939 €\n\n" +
            "Exemple :\n" +
            "• Coefficient : 403\n" +
            "• Expérience : 14\n" +
            "• Compétences : 82\n" +
            "Total : 499 points → 499 × 7,60939 = 3 797,09 € brut."
    },

    {
        q: "Combien y a‑t‑il de CNPR en France ?",
        hint: "Ils sont trois…",
        answer:
            "Il existe 3 CNPR :\n" +
            "• CNPR Centre‑Val de Loire\n" +
            "• CNPR Midi‑Pyrénées\n" +
            "• CNPR Rhône‑Alpes"
    },

    {
        q: "Combien de personnes travaillent dans le service ?",
        hint: "Petite équipe…",
        answer:
            "CNPR Centre‑Val de Loire :\n" +
            "• 18 agents\n" +
            "• Manager : Laetitia PERRIER"
    },

    {
        q: "Que faire en cas d’erreur sur ma paie ?",
        hint: "Contact GA…",
        answer:
            "Contactez la Gestion Administrative (GA) :\n" +
            "• ga.cvl@urssaf.fr\n" +
            "• Ticket GLPI via PRISM\n\n" +
            "➡️ Régularisation le mois suivant."
    },

    {
        q: "Quel est le montant du PMSS ?",
        hint: "Année 2026…",
        answer: "Le PMSS 2026 est de 4 005 €."
    },

    {
        q: "Qu’est‑ce que le Montant Net Social (MNS) ?",
        hint: "Prestations sociales…",
        answer:
            "Revenu net après cotisations sociales obligatoires.\n" +
            "Utilisé pour :\n" +
            "• Prime d’activité\n" +
            "• RSA\n" +
            "• Prestations sociales"
    },

    {
        q: "Qu’est‑ce que la DSN ?",
        hint: "Déclaration mensuelle…",
        answer:
            "Transmission mensuelle obligatoire :\n" +
            "• Données de paie\n" +
            "• Cotisations\n" +
            "• Événements (arrêts, fins de contrat…)\n\n" +
            "➡️ Remplace la majorité des anciennes déclarations sociales."
    }

];

/* ----------------------------------------------------
   CONSTRUCTION DE LA ROUE
---------------------------------------------------- */

const wheel = document.getElementById("wheel");
const segmentAngle = 360 / questions.length;

questions.forEach((item, i) => {
    const segment = document.createElement("div");
    segment.className = "segment";
    segment.style.transform = `rotate(${i * segmentAngle}deg) skewY(${90 - segmentAngle}deg)`;
    segment.innerHTML = item.q;
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
