// --- DATA ---

const juiceKasser = [
    { id: "Træningskassen", navn: "Træningskassen", billede: "IMG/produkter/træningskassen.png" },
    { id: "Immunkassen", navn: "Immunkassen", billede: "IMG/produkter/immunkassen.png"  },
    { id: "Fokuskassen", navn: "Fokuskassen", billede: "IMG/produkter/fokuskassen.png" },
    { id: "Balanceringskassen", navn: "Balanceringskassen", billede: "IMG/produkter/balanceringskassen.png" },
    { id: "Familiekassen", navn: "Familiekassen", billede: "IMG/produkter/familiekassen.png" }
];

const juiceProdukter = [
    { id: "juice1", navn: "Focus, Juice 330ml.", billede: "IMG/produkter/focus.png" },
    { id: "juice2", navn: "Ignite, Juice 60ml.", billede: "IMG/produkter/ignite.png" },
    { id: "juice3", navn: "Balance, Vand 330ml.", billede: "IMG/produkter/balance.png" },
    { id: "juice4", navn: "Flow, Juice 330ml.", billede: "IMG/produkter/flow.png" },
    { id: "juice5", navn: "Restore, Juice 750ml.", billede: "IMG/produkter/restore.png" }
];

const juiceAntal = {
    juice1: 1,
    juice2: 1,
    juice3: 1,
    juice4: 1,
    juice5: 1
};

const brugerensSvar = { 1: null, 2: null, 3: null };

const spørgsmålListe = [
    {
        id: 1,
        tekst: "Hvad kan din juicekasse hjælpe dig med?",
        svarMuligheder: ["Træning og restitution", "Styrket immunforsvar", "Øget mentalt fokus", "Generel sund livsstil"]
    },
    {
        id: 2,
        tekst: "Hvad passer bedst til din hverdag?",
        svarMuligheder: ["Ét om dagen", "Flere om dagen", "Til deling i familien", "Variende behov"]
    },
    {
        id: 3,
        tekst: "Hvor mange personer skal kassen dække?",
        svarMuligheder: ["1 person", "2 personer", "3-4 personer", "mere end 5 personer"]
    }
];

// --- HTML ELEMENTER ---

const spørgsmålTekstEl = document.getElementById("spørgsmålTekst");
const svarbokseContainerEl = document.getElementById("svarbokseContainer");
const tilbagePilEl = document.getElementById("tilbagePil");
const videreKnapEl = document.getElementById("videreKnap");
const quizContainerEl = document.querySelector(".spørgsmål-container");
const resultContainerEl = document.getElementById("resultContainer");
const anbefaletKasseContainer = document.getElementById("anbefaletKasseContainer");
const andreKasserContainer = document.getElementById("andreKasserContainer");
const juiceProdukterContainer = document.getElementById("juiceProdukterContainer");

let aktivtSpørgsmålIndex = 0;

// --- FUNKTIONER ---

function visSpørgsmål(index) {
    const spørgsmål = spørgsmålListe[index];
    spørgsmålTekstEl.textContent = spørgsmål.tekst;
    svarbokseContainerEl.innerHTML = "";

    spørgsmål.svarMuligheder.forEach((tekst) => {
        const boks = document.createElement("div");
        boks.classList.add("svar-boks");
        boks.textContent = tekst;

        if (brugerensSvar[spørgsmål.id] === tekst) {
            boks.classList.add("valgt");
            boks.textContent = "";
            boks.appendChild(document.createTextNode(tekst));
            const ikon = document.createElement("img");
            ikon.src = "IMG/ikoner/Tjekmark.png";
            ikon.classList.add("tjekmark-quiz");
            boks.appendChild(ikon);
            videreKnapEl.disabled = false;
        }

        boks.addEventListener("click", () => {
            // Fjern markering på alle svarbokse
            svarbokseContainerEl.querySelectorAll(".svar-boks").forEach(el => {
                el.classList.remove("valgt");
                // Gendan tekst uden billede hvis det er sat
                const eksisterendeIkon = el.querySelector(".tjekmark-quiz");
                if (eksisterendeIkon) eksisterendeIkon.remove();
            });
            boks.classList.add("valgt");
            boks.textContent = "";
            boks.appendChild(document.createTextNode(tekst));
            const ikon = document.createElement("img");
            ikon.src = "IMG/ikoner/Tjekmark.png";
            ikon.classList.add("tjekmark-quiz");
            boks.appendChild(ikon);
            brugerensSvar[spørgsmål.id] = tekst;
            videreKnapEl.disabled = false;
        });

        // Hvis svaret ikke allerede er valgt, sæt tekstContent normalt
        if (!(brugerensSvar[spørgsmål.id] === tekst)) {
            boks.textContent = tekst;
        }

        svarbokseContainerEl.appendChild(boks);
    });

    // Tilføj forklaringstekst under svar-bokse
    const forklaring = document.createElement("h3");
    const forklaringTekster = {
        1: "Fortæl os, hvad dit mål er, så anbefaler vi en kasse, der matcher dine behov.",
        2: "Fortæl os hvor meget du regner med at drikke, så klarer vi resten.",
        3: "Det hjælper os med at finde den rette størrelse og variation."
    };
    forklaring.textContent = forklaringTekster[spørgsmål.id] || "Vælg ét svar for at gå videre";
    svarbokseContainerEl.appendChild(forklaring);

    videreKnapEl.disabled = brugerensSvar[spørgsmål.id] === null;
}

function findJuiceKasse(svar) {
    switch (svar) {
        case "Træning og restitution": return "Træningskassen";
        case "Styrket immunforsvar": return "Immunkassen";
        case "Øget mentalt fokus": return "Fokuskassen";
        case "Generel sund livsstil": return "Balanceringskassen";
        default: return null;
    }
}

function beregnAntalJuicerPrUge(svarDagligt, svarPersoner) {
    let basisAntal = 7;

    switch (svarDagligt) {
        case "Ét om dagen": basisAntal = 7; break;
        case "Flere om dagen": basisAntal = 10; break;
        case "Til deling i familien": basisAntal = 5; break;
        case "Variende behov": basisAntal = 8; break;
    }

    let personer = 1;
    switch (svarPersoner) {
        case "1 person": personer = 1; break;
        case "2 personer": personer = 1,5; break;
        case "3-4 personer": personer = 2; break;
        case "mere end 5 personer": personer = 3; break;
    }

    return basisAntal * personer;
}

function visAnbefaling() {
    quizContainerEl.style.display = "none";
    resultContainerEl.style.display = "block";

    const valgtKasseId = findJuiceKasse(brugerensSvar[1]);
    const valgtKasseData = juiceKasser.find(k => k.id === valgtKasseId);

    if (!valgtKasseData) {
        anbefaletKasseContainer.innerHTML = "<p style='color:red;'>Fejl: Ingen anbefalet kasse fundet.</p>";
        return;
    }

    const antalJuicer = beregnAntalJuicerPrUge(brugerensSvar[2], brugerensSvar[3]);

    const antalPerJuice = Math.floor(antalJuicer / juiceProdukter.length);
    for (const juice of juiceProdukter) {
        juiceAntal[juice.id] = antalPerJuice;
        opdaterJuiceAntalUI(juice.id);
    }

    // Fjern linjen: anbefaletKasseContainer.innerHTML = "";
    andreKasserContainer.innerHTML = "";
    juiceProdukterContainer.innerHTML = "";

    // Anbefalet kasse stort card
    let valgtCard;
    if (!anbefaletKasseContainer.querySelector(".kasse-card.stor")) {
        valgtCard = document.createElement("div");
        valgtCard.classList.add("kasse-card", "stor");
        valgtCard.innerHTML = `
        <img src="${valgtKasseData.billede}" alt="${valgtKasseData.navn}">
        <h3>${valgtKasseData.navn}</h3>
        <button class="valgt-knap aktiv">
        <span>Valgt</span>
        <img src="IMG/ikoner/Tjekmark.png" alt="">
        </button>
        <a href=""><p>Læs mere</p></a>
      `;
        anbefaletKasseContainer.appendChild(valgtCard);
    } else {
        valgtCard = anbefaletKasseContainer.querySelector(".kasse-card.stor");
        valgtCard.querySelector("img").src = valgtKasseData.billede;
        valgtCard.querySelector("img").alt = valgtKasseData.navn;
        valgtCard.querySelector("h3").textContent = valgtKasseData.navn;
        // valgtCard.querySelector("p em").textContent = `Antal juice pr uge: ${antalJuicer}`;
        // Opdater knappen hvis den findes
        const valgtKnappen = valgtCard.querySelector(".valgt-knap");
        if (valgtKnappen) {
            valgtKnappen.classList.add("aktiv");
            valgtKnappen.innerHTML = `<span>Valgt</span><img src="IMG/ikoner/Tjekmark.png" alt="" class="checkmark-ikon">`;
            valgtKnappen.disabled = false;
        }
    }

    // Gør knappen i det anbefalede kort klikbar og tilføj eventlistener
    const anbefaletKnap = valgtCard.querySelector(".valgt-knap");
    if (anbefaletKnap) {
        anbefaletKnap.disabled = false;
        anbefaletKnap.classList.add("aktiv");
        anbefaletKnap.innerHTML = `<span>Valgt</span><img src="IMG/ikoner/Tjekmark.png" alt="" class="checkmark-ikon">`;
        anbefaletKnap.addEventListener("click", () => {
            // Sæt alle andre knapper tilbage til "Vælg" og ikke aktiv
            andreKasserContainer.querySelectorAll(".valgt-knap").forEach(btn => {
                btn.classList.remove("aktiv");
                btn.innerHTML = `Vælg`;
                btn.disabled = false;
            });
            // Sæt denne knap til aktiv, "Valgt" og disabled
            anbefaletKnap.classList.add("aktiv");
            anbefaletKnap.innerHTML = `<span>Valgt</span><img src="IMG/ikoner/Tjekmark.png" alt="" class="checkmark-ikon">`;
            anbefaletKnap.disabled = true;
            // Opdater brugerensSvar[1] til den relevante tekstværdi
            const svarTekst = Object.entries({
                "Træningskassen": "Træning og restitution",
                "Immunkassen": "Styrket immunforsvar",
                "Fokuskassen": "Øget mentalt fokus",
                "Balanceringskassen": "Generel sund livsstil"
            }).find(([id, tekst]) => id === valgtKasseData.id)?.[1] || null;
            if (svarTekst) {
                brugerensSvar[1] = svarTekst;
            }
        });
        // Sæt knappen til valgt og disabled fra start
        anbefaletKnap.disabled = true;
    }

    // Andre kasser små cards med "Vælg"
    juiceKasser.forEach(kasse => {
        if (kasse.id !== valgtKasseId) {
            const card = document.createElement("div");
            card.classList.add("kasse-card");
            card.innerHTML = `
            <img src="${kasse.billede}" alt="${kasse.navn}">
            <h4>${kasse.navn}</h4>
            <button class="valgt-knap vælg-knap">Vælg</button>
          `;
            const knap = card.querySelector(".vælg-knap");
            knap.addEventListener("click", () => {
                // Fjern aktiv klasse og sæt tekst til "Vælg" for alle valgt-knap knapper
                andreKasserContainer.querySelectorAll(".valgt-knap").forEach(btn => {
                    btn.classList.remove("aktiv");
                    btn.innerHTML = `Vælg`;
                    btn.disabled = false;
                });
                const valgtKnappen = anbefaletKasseContainer.querySelector(".valgt-knap");
                if (valgtKnappen) {
                    valgtKnappen.classList.remove("aktiv");
                    valgtKnappen.innerHTML = `Vælg`;
                    valgtKnappen.disabled = false;
                }

                // Opdater brugerensSvar[1] til det nye svar
                const svarTekst = Object.entries({
                    "Træningskassen": "Træning og restitution",
                    "Immunkassen": "Styrket immunforsvar",
                    "Fokuskassen": "Øget mentalt fokus",
                    "Balanceringskassen": "Generel sund livsstil"
                }).find(([id, tekst]) => id === kasse.id)?.[1] || null;

                if (svarTekst) {
                    brugerensSvar[1] = svarTekst;
                }

                // Opdater knap i anbefalet kasse til aktiv og tekst "Valgt"
                if (valgtKnappen) {
                    valgtKnappen.classList.remove("aktiv");
                    valgtKnappen.innerHTML = `Vælg`;
                    valgtKnappen.disabled = false;
                }

                // Opdater trykket knap til aktiv og tekst "Valgt" og disabled
                knap.classList.add("aktiv");
                knap.innerHTML = `<span>Valgt</span><img src="IMG/ikoner/Tjekmark.png" alt="" class="checkmark-ikon">`;
                knap.disabled = true;
            });
            andreKasserContainer.appendChild(card);
        }
    });

    // Juiceprodukter med antal og plus/minus knapper
    juiceProdukter.forEach(juice => {
        const card = document.createElement("div");
        card.classList.add("juice-card");
        card.innerHTML = `
      <img src="${juice.billede}" alt="${juice.navn}">
      <div class="juice-antal" id="antal-${juice.id}">${juiceAntal[juice.id]}</div>
      <div class="juster-knapper">
        <button class="plus">+</button>
        <button class="minus">−</button>
      </div>
      <div class="juice-navn">${juice.navn}</div>
    `;

        card.querySelector(".plus").addEventListener("click", () => {
            juiceAntal[juice.id]++;
            opdaterJuiceAntalUI(juice.id);
        });

        card.querySelector(".minus").addEventListener("click", () => {
            if (juiceAntal[juice.id] > 0) {
                juiceAntal[juice.id]--;
                opdaterJuiceAntalUI(juice.id);
            }
        });

        juiceProdukterContainer.appendChild(card);
    });
    // Opdater progress bar ved gennemført quiz
    function opdaterProgressBar() {
        const ikon2 = document.querySelector(".progress-ikon-2 img");
        const streg1 = document.querySelector(".progress-linje-1");

        if (ikon2) ikon2.src = "IMG/ikoner/Juice-grøn.png"; // Grøn version af ikon
        if (streg1) streg1.style.backgroundColor = "green";
    }

    opdaterProgressBar();

}

function opdaterJuiceAntalUI(juiceId) {
    const antalEl = document.getElementById(`antal-${juiceId}`);
    if (antalEl) {
        antalEl.textContent = juiceAntal[juiceId];
    }
}

// --- Navigation knapper ---
videreKnapEl.addEventListener("click", () => {
    if (aktivtSpørgsmålIndex < spørgsmålListe.length - 1) {
        aktivtSpørgsmålIndex++;
        videreKnapEl.disabled = true;
        visSpørgsmål(aktivtSpørgsmålIndex);
    } else {
        visAnbefaling();
    }
});

if (tilbagePilEl) {
    tilbagePilEl.addEventListener("click", () => {
        if (aktivtSpørgsmålIndex > 0) {
            aktivtSpørgsmålIndex--;
            videreKnapEl.disabled = false;
            visSpørgsmål(aktivtSpørgsmålIndex);
        }
    });
}

// --- Start quiz ---
visSpørgsmål(aktivtSpørgsmålIndex);
