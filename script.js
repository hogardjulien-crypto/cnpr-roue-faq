let mode = "normal";

function setMode(m) {
    mode = m;
    document.getElementById("result").innerHTML = "Mode sélectionné : " + m;
    document.getElementById("answer").innerHTML = "";
    document.getElementById("hint").innerHTML = "";
}

const questions = [
    {
        q: "Qu’est-ce que le CNPR ?",
        hint: "Organisme chargé de la paie et du recouvrement…",
        answer: "Le CNPR est le Centre National de la Paie et du Recouvrement."
    },
    {
        q: "Quel est le PMSS 2026 ?",
        hint: "Il augmente chaque année…",
        answer: "Le PMSS 2026 est de 3 999 €."
    },
    {
        q: "Comment sont calculés les titres-restaurant ?",
        hint: "Part employeur + part salarié…",
        answer: "Ils sont calculés selon la contribution employeur et la valeur faciale."
    },
    {
        q: "Comment est calculé le salaire brut ?",
        hint: "Base × taux…",
        answer: "Le salaire brut = base × taux + primes éventuelles."
    },
    {
        q: "Comment fonctionne la régularisation ?",
        hint: "Elle corrige les écarts…",
        answer: "La régularisation ajuste les cotisations selon les plafonds."
    },
    {
        q: "Pourquoi utilise-t-on la règle M-2 ?",
        hint: "Elle sert à déterminer…",
        answer: "La règle M-2 sert à calculer les droits en fonction du mois précédent."
    },
    {
        q: "Qui contacter en cas de question paie ?",
        hint: "Ton interlocuteur interne…",
        answer: "Le gestionnaire paie du CNPR."
    },
    {
        q: "Quels sont les délais de traitement ?",
        hint: "En général quelques jours…",
        answer: "Les délais varient selon la demande, souvent 48 à 72h."
    },
    {
        q: "Comment lire mon bulletin ?",
        hint: "Il est structuré en zones…",
        answer: "Le bulletin se lit par blocs : identité, salaire, cotisations, net."
    },
    {
        q: "Où trouver les documents RH ?",
        hint: "Sur l’intranet…",
        answer: "Les documents RH sont disponibles sur l’intranet URSSAF."
    }
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

    const random = Math.floor(Math.random() * questions.length);
    const angle = 360 * 5 + (360 - random * segmentAngle);
    wheel.style.transform = `rotate(${angle}deg)`;

    setTimeout(() => {
        const item = questions[random];

        let points = 1;
        if (mode === "double") points = 2;

        document.getElementById("result").innerHTML =
            "👉 Question tirée (" + points + " point(s)) : <br><br><strong>" + item.q + "</strong>";

        document.getElementById("hint").innerHTML =
            "💡 Indice : " + item.hint;

        setTimeout(() => {
            document.getElementById("answer").innerHTML =
                "✔️ Réponse : " + item.answer;
        }, 10000);

    }, 5000);
}
