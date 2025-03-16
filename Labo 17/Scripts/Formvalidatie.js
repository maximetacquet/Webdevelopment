const setup = () => {
    let knop=document.getElementById("knop");
    knop.addEventListener("click", valideer);
};

const valideer = () => {
    voornaam();
    familienaam();
    geboortedatum();
    email();
    kinderen();
};

const voornaam = () => {
    let voornaamInput = document.getElementById("voornaamInput");
    let errorVoornaam = document.getElementById("errorVoornaam");
    let voornaam = voornaamInput.value.trim();
    if (voornaam.length > 30) {
        voornaamInput.className="invalid";
        errorVoornaam.innerHTML = "max. 30 karakters";
    } else {
        voornaamInput.className="";
        errorVoornaam.innerHTML = "";
    }
};

const familienaam = () => {
    let familienaamInput = document.getElementById("familienaamInput");
    let errorFamilienaam = document.getElementById("errorFamilienaam");
    let familienaam = familienaamInput.value.trim();
    let error = "";
    if (familienaam.length > 50) {
        error = "max. 50 karakters ";
        familienaamInput.className="invalid";
    } else if (familienaam.length === 0) {
        error = "verplicht in te vullen";
        familienaamInput.className="invalid";
    } else {
        familienaamInput.className="";
    }

    errorFamilienaam.innerHTML = error;
}

const geboortedatum = () => {
    let geboortedatumInput = document.getElementById("geboortedatumInput");
    let errorGeboortedatum = document.getElementById("errorGeboortedatum");
    let geboortedatum = geboortedatumInput.value.trim();
    let jaar = geboortedatum.substring(0, 4);
    let maand = geboortedatum.substring(5, 7);
    let dag = geboortedatum.substring(8,10);

    if (geboortedatum.length === 0) {
        errorGeboortedatum.innerHTML = "verplicht in te vullen";
        geboortedatumInput.className="invalid";
    }
    else if (!isGetal(jaar) || !isGetal(maand) || !isGetal(dag)) {
        errorGeboortedatum.innerHTML = "formaat is niet jjjj-mm-dd";
        geboortedatumInput.className="invalid";
    } else {
        geboortedatumInput.className="";
        errorGeboortedatum.innerHTML="";
    }


}
const isGetal = (tekst) => {
    return !isNaN(tekst);
}
const email = () => {
    let mailInput = document.getElementById("mailInput");
    let errorMail = document.getElementById("errorMail");
    let email = mailInput.value.trim();
    if (email.length === 0) {
        errorMail.innerHTML = "verplicht in te vullen";
        mailInput.className = "verkeerde input";
    } else {
        errorMail.innerHTML = "";
        mailInput.className = "";
    }
}
const kinderen = () => {
    let kinderenInput = document.getElementById("kinderenInput");
    let errorKinderen = document.getElementById("errorKinderen");
    let kinderen = kinderenInput.value.trim();
    if (!isGetal(kinderen) || Number.parseInt(kinderen) < 0) {
        kinderenInput.className="verkeerde input";
        errorKinderen.innerHTML = "je moet een positief getal ingeven";
    } else if (Number.parseInt(kinderen) > 99) {
        kinderenInput.className="verplicht in te vullen";
        errorKinderen.innerHTML = "is te vruchtbaar";
    } else {
        errorKinderen.innerHTML="";
        kinderenInput.className="";
    }
}
window.addEventListener("load", setup);