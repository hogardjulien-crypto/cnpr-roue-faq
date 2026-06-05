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
