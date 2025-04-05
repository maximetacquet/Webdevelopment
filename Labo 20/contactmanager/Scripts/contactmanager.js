const setup = () => {
    let btnBewaar = document.getElementById("btnBewaar");
    btnBewaar.addEventListener("click", bewaarBewerktePersoon);

    let btnNieuw = document.getElementById("btnNieuw");
    btnNieuw.addEventListener("click", bewerkNieuwePersoon);

    let lstPersonen = document.getElementById("lstPersonen");
    lstPersonen.addEventListener("change", (e) => {
        let selectedOption = e.target.options[e.target.selectedIndex];
        let index = selectedOption.getAttribute("data-index");
        huidigePersoonIndex = parseInt(index);
        let persoon = personen[huidigePersoonIndex];
        toonPersoonInFormulier(persoon);
    });
};
let personen = [];
let huidigePersoonIndex = -1;

const toonPersoonInFormulier = (persoon) => {
    document.getElementById("txtVoornaam").value = persoon.voornaam;
    document.getElementById("txtFamilienaam").value = persoon.familienaam;
    document.getElementById("txtGeboorteDatum").value = persoon.geboorteDatum;
    document.getElementById("txtEmail").value = persoon.email;
    document.getElementById("txtAantalKinderen").value = persoon.aantalKinderen;
};

const leegFormulier = () => {
    document.getElementById("txtVoornaam").value = "";
    document.getElementById("txtFamilienaam").value = "";
    document.getElementById("txtGeboorteDatum").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtAantalKinderen").value = "";

    // Fouten wissen
    let errors = document.querySelectorAll(".errorMessage");
    errors.forEach(span => span.innerText = "");
};


const updatePersonenLijst = () => {
    let lst = document.getElementById("lstPersonen");
    lst.innerHTML = "";

    personen.forEach((persoon, index) => {
        let optie = document.createElement("option");
        optie.text = `${persoon.voornaam} ${persoon.familienaam}`;
        optie.setAttribute("data-index", index);
        lst.appendChild(optie);
    });
};

const bewaarBewerktePersoon = () => {
    console.log("Klik op de knop bewaar");
    valideer();

    // We gaan ervan uit dat validatie gelukt is
    let voornaam = document.getElementById("txtVoornaam").value.trim();
    let familienaam = document.getElementById("txtFamilienaam").value.trim();
    let geboorteDatum = document.getElementById("txtGeboorteDatum").value.trim();
    let email = document.getElementById("txtEmail").value.trim();
    let aantalKinderen = parseInt(document.getElementById("txtAantalKinderen").value.trim());

    if (huidigePersoonIndex === -1) {
        // Nieuw persoon
        let nieuwPersoon = {
            voornaam,
            familienaam,
            geboorteDatum,
            email,
            aantalKinderen
        };
        personen.push(nieuwPersoon);
    } else {
        // Bestaande persoon aanpassen
        let persoon = personen[huidigePersoonIndex];
        persoon.voornaam = voornaam;
        persoon.familienaam = familienaam;
        persoon.geboorteDatum = geboorteDatum;
        persoon.email = email;
        persoon.aantalKinderen = aantalKinderen;
    }

    updatePersonenLijst();
    let lst = document.getElementById("lstPersonen");
    lst.selectedIndex = huidigePersoonIndex === -1 ? personen.length - 1 : huidigePersoonIndex;
    huidigePersoonIndex = lst.selectedIndex;
};

const bewerkNieuwePersoon = () => {
    console.log("Klik op de knop nieuw");
    leegFormulier();
    huidigePersoonIndex = -1;
    document.getElementById("lstPersonen").selectedIndex = -1;
};



window.addEventListener("load", setup);
