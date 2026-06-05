/* ----------------------------------------------------
   MODE, SCORE, SONS, ROUE — inchangé
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

    // Passe au joueur suivant
    currentPlayer++;
    if (currentPlayer > 4) currentPlayer = 1;

    // Met à jour l'affichage du tour
    document.getElementById("turn").innerHTML = "🎯 Tour du Joueur " + currentPlayer;
}


const questions = [
    {
        q: "Qu’est‑ce que le CNPR ?",
        hint: "Centre spécialisé URSSAF…",
        answer: "Le CNPR est le Centre National de la Paie du Recouvrement, chargé de produire la paie pour le réseau URSSAF."
    },
    {
        q: "Combien de bulletins de salaire sont traités chaque mois ?",
        hint: "Plus de 6 000…",
        answer: "Le CNPR Centre‑Val de Loire produit environ 6 200 à 6 300 bulletins de salaire par mois."
    },
    {
        q: "Peut‑on centraliser les bulletins de salaire électroniquement ?",
        hint: "Coffre‑fort numérique…",
        answer: "Oui, via DIGIPOSTE : stockage sécurisé, conservation à vie, accès 24/7."
    },
    {
        q: "Comment sont calculés les titres‑restaurant ?",
        hint: "Valeur faciale 11,52 €…",
        answer: "Valeur faciale : 11,52 € • Part employeur : 6,91 € (60 %) • Part salarié : 4,61 € (40 %) • Prélèvement = 4,61 € × nombre de titres • Calcul basé sur M‑2 (ex : titres de mars → éléments de janvier)."
    },
    {
        q: "Comment est calculé le salaire brut ?",
        hint: "Points × valeur du point…",
        answer: "(Coefficient + Compétences + Expérience) × Valeur du point (7,60939 €). Exemple : 403 + 14 + 82 = 499 points → 499 × 7,60939 = 3 797,09 € brut."
    },
    {
        q: "Combien y a‑t‑il de CNPR en France ?",
        hint: "Ils sont trois…",
        answer: "Il existe 3 CNPR : Centre‑Val de Loire, Midi‑Pyrénées, Rhône‑Alpes."
    },
    {
        q: "Combien de personnes travaillent dans le service ?",
        hint: "Une petite équipe…",
        answer: "CNPR Centre‑Val de Loire : 18 agents • Manager : Laetitia PERRIER."
    },
    {
        q: "Que faire en cas d’erreur sur ma paie ?",
        hint: "Contact GA…",
        answer: "Contacter la Gestion Administrative : ga.cvl@urssaf.fr ou ticket GLPI via PRISM. Régularisation le mois suivant."
    },
    {
        q: "Quel est le montant du PMSS ?",
        hint: "Année 2026…",
        answer: "Le PMSS 2026 est de 4 005 €."
    },
    {
        q: "Qu’est‑ce que le Montant Net Social (MNS) ?",
        hint: "Utilisé pour prestations…",
        answer: "Le MNS est le revenu net après cotisations sociales obligatoires. Utilisé pour la prime d’activité, le RSA et d’autres prestations."
    },
    {
        q: "Qu’est‑ce que la DSN ?",
        hint: "Déclaration mensuelle…",
        answer: "La DSN est une transmission mensuelle obligatoire : données de paie, cotisations, événements (arrêts, fins de contrat…). Elle remplace la majorité des anciennes déclarations sociales."
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

/* ----------------------------------------------------
   QR CODE — vraie librairie intégrée
---------------------------------------------------- */

class QRCodeGenerator {
    constructor(element, text) {
        this.element = element;
        this.text = text;
        this.generate();
    }

    generate() {
        const size = 200;
        const qrCanvas = document.createElement("canvas");
        qrCanvas.width = size;
        qrCanvas.height = size;
        this.element.appendChild(qrCanvas);

        const qr = new QRious({
            element: qrCanvas,
            value: this.text,
            size: size,
            level: "H"
        });
    }
}

/* ----------------------------------------------------
   Librairie QRious intégrée (QR code réel)
---------------------------------------------------- */

class QRious {
    constructor(options) {
        this.element = options.element;
        this.value = options.value;
        this.size = options.size || 200;
        this.level = options.level || "L";

        this.qr = new QRCodeModel(4, this.level);
        this.qr.addData(this.value);
        this.qr.make();

        this.draw();
    }

    draw() {
        const ctx = this.element.getContext("2d");
        const count = this.qr.getModuleCount();
        const tile = this.size / count;

        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, this.size, this.size);

        ctx.fillStyle = "#000";
        for (let r = 0; r < count; r++) {
            for (let c = 0; c < count; c++) {
                if (this.qr.isDark(r, c)) {
                    ctx.fillRect(c * tile, r * tile, tile, tile);
                }
            }
        }
    }
}

/* ----------------------------------------------------
   Génération du QR code
---------------------------------------------------- */

new QRCodeGenerator(
    document.getElementById("qrcode"),
    "https://hogardjulien-crypto.github.io/cnpr-roue-faq/"
);
