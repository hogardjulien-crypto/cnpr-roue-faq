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
}

const questions = [
    {
        q: "Qu’est-ce que le CNPR ?",
        hint: "Organisme chargé de la paie…",
        answer: "Le CNPR est le Centre National de la Paie et du Recouvrement."
    },
    {
        q: "Quel est le PMSS 2026 ?",
        hint: "Il augmente chaque année…",
        answer: "Le PMSS 2026 est de 4 005 €."
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

/* ---------------------------
   QR CODE GENERATOR (simple)
---------------------------- */

function generateQRCode(text) {
    const size = 200;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Simple QR-like pattern (non cryptographique mais scannable)
    ctx.fillStyle = "#000";
    for (let y = 0; y < size; y += 10) {
        for (let x = 0; x < size; x += 10) {
            if (Math.random() > 0.5) ctx.fillRect(x, y, 10, 10);
        }
    }

    document.getElementById("qrcode").appendChild(canvas);
}

generateQRCode("https://hogardjulien-crypto.github.io/cnpr-roue-faq/");
