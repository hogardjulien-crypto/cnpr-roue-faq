const questions = [
    "Qu’est-ce que le CNPR ?",
    "Quel est le PMSS 2026 ?",
    "Comment sont calculés les titres-restaurant ?",
    "Comment est calculé le salaire brut ?",
    "Comment fonctionne la régularisation ?",
    "Pourquoi utilise-t-on la règle M-2 ?",
    "Qui contacter en cas de question paie ?",
    "Quels sont les délais de traitement ?",
    "Comment lire mon bulletin ?",
    "Où trouver les documents RH ?"
];

const wheel = document.getElementById("wheel");
const segmentAngle = 360 / questions.length;

questions.forEach((q, i) => {
    const segment = document.createElement("div");
    segment.className = "segment";
    segment.style.transform = `rotate(${i * segmentAngle}deg) skewY(${90 - segmentAngle}deg)`;
    segment.innerHTML = q;
    wheel.appendChild(segment);
});

function spin() {
    const random = Math.floor(Math.random() * questions.length);
    const angle = 360 * 5 + (360 - random * segmentAngle);
    wheel.style.transform = `rotate(${angle}deg)`;
    setTimeout(() => {
        document.getElementById("result").innerHTML =
            "👉 Question tirée : <br><br><strong>" + questions[random] + "</strong>";
    }, 5000);
}
