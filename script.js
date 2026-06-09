/* ----------------------------------------------------
   MODE, SCORE, SONS
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
   QUESTIONS OFFICIELLES CNPR — VERSION À JOUR
---------------------------------------------------- */

const questions = [

    {
        q: "Qu’est‑ce que le CNPR ?",
        hint: "Centre spécialisé URSSAF…",
        answer:
            "Le CNPR est le Centre National de la Paie du Recouvrement. " +
            "Il s’agit d’un centre spécialisé du réseau URSSAF chargé de produire la paie pour les agents, " +
            "en appliquant les règles nationales et les procédures internes."
    },

    {
        q: "Combien d’organismes sont gérés par le CNPR Centre‑Val de Loire ?",
        hint: "Ils sont 9…",
        answer: "Le CNPR Centre‑Val de Loire gère 9 organismes."
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
        hint: "Valeur faciale 12 €…",
        answer:
            "Paramètres 2026 :\n" +
            "• Valeur faciale : 12,00 €\n" +
            "• Part employeur : 7,20 € (60 %)\n" +
            "• Part salarié : 4,80 € (40 %)\n\n" +
            "Prélèvement : 4,80 € × nombre de titres attribués\n\n" +
            "📌 Règle M‑2 :\n" +
            "• Titres de mars → éléments de janvier\n" +
            "• Titres d’avril → éléments de février"
    },

    {
        q: "Comment est calculé le salaire brut ?",
        hint: "Points × valeur du point…",
        answer:
            "Formule URSSAF : (Coefficient + Compétences + Expérience) × Valeur du point.\n" +
            "Valeur du point 2026 : 7,60939 €"
    },

    {
        q: "Combien de CNPR existe‑t‑il en France ?",
        hint: "Ils sont trois…",
        answer:
            "Il existe 3 CNPR :\n" +
            "• CNPR Centre‑Val de Loire\n" +
            "• CNPR Midi‑Pyrénées\n" +
            "• CNPR Rhône‑Alpes"
    },

    {
        q: "Combien de personnes travaillent dans le service ?",
        hint: "20 personnes…",
        answer:
            "Le CNPR Centre‑Val de Loire compte 20 agents, dont 1 manager et 3 assistantes techniques."
    },

    {
        q: "Que faire si j’ai des questions sur ma paie ?",
        hint: "GA / PRISM / DEA…",
        answer:
            "Vous pouvez contacter la Gestion Administrative (GA) :\n" +
            "• Mail : ga.cvl@urssaf.fr\n" +
            "• Ticket GLPI : portail PRISM\n" +
            "• Formulaire dans le Dossier Électronique de l’Agent (DEA)\n" +
            "  ➜ transmis automatiquement à la GA\n\n" +
            "Les équipes GA procèdent aux vérifications et ajustements si nécessaire."
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
            "Le MNS est le revenu net après cotisations sociales obligatoires. " +
            "Il sert notamment pour :\n" +
            "• la Prime d’activité\n" +
            "• le RSA\n" +
            "• d’autres prestations sociales"
    },

    {
        q: "Qu’est‑ce que la DSN ?",
        hint: "Déclaration mensuelle…",
        answer:
            "La Déclaration Sociale Nominative (DSN) est une transmission mensuelle obligatoire regroupant :\n" +
            "• données de paie\n" +
            "• cotisations\n" +
            "• événements (arrêts, fins de contrat…)\n\n" +
            "Elle remplace la majorité des anciennes déclarations sociales."
    }

];
